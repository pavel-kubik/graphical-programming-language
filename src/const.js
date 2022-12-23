export const DATA_TEMPLATE = '%data%';
export const CODE_TEMPLATE = `// code edited by https://graphpl.netlify.app/
// set variable 'output' to return data
let output = '${DATA_TEMPLATE}'.split('\\n').join('-')`;
export const WORKER_TEMPLATE = `// worker handlers
self.onmessage=function(e){postMessage(output);}
self.terminate=function(e){console.log('Worker terminated');}
`;
