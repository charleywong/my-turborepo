import * as glob from 'glob';
import * as fs from 'fs';

 function getAllReports(coverageType: string) {
   const reportPaths = glob.globSync(`./**/coverage/coverage-summary.json`, { ignore: ['node_modules/**']});
   // console.log(reportPaths);
   const coverageSummary = {}
   
   for (const reportPath of reportPaths) {
      try {
         const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
         Object.keys(report).forEach((key) => {
            if (coverageSummary[key]) {
               // console.log(coverageSummary[key]);
               Object.keys(report[key]).forEach((reportKey) => {
                  // console.log(reportKey);
                  coverageSummary[key][reportKey].total += report[key][reportKey].total;
                  coverageSummary[key][reportKey].covered += report[key][reportKey].covered;
                  coverageSummary[key][reportKey].skipped += report[key][reportKey].skipped;
                  coverageSummary[key][reportKey].pct = Number(((coverageSummary[key][reportKey].covered / coverageSummary[key][reportKey].total) * 100).toFixed(2)) || 0;
               })
            } else {
               coverageSummary[key] = report[key];
            }
         })
      } catch (err) {
         throw new Error(err);
      }
   }


   return coverageSummary;
 }


 function aggregateCoverageReports() {
    const allCoverageSummaryReports = getAllReports('summary');
    if (!fs.existsSync('./coverage')) {
      fs.mkdirSync('./coverage');
    }
    fs.writeFileSync('./coverage/coverage-summary.json', JSON.stringify(allCoverageSummaryReports, null, 2))
   //  console.log(allCoverageSummaryReports);
 }

 aggregateCoverageReports();