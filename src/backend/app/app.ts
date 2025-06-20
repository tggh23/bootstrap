import Agent from './agents/agent.js'
import { exec } from 'child_process';
import { promisify } from 'util';
import fileWriter from './utils/fileWriter.js'



// const generatorAgent = new Agent('0');
// const generatorMessages = [
//     { role: "developer", content: "Only return whats requested no additional characters" },
//     { role: "user", content: "Write any haiku." }
// ];
const generatorAgent = new Agent('0');
const generatorMessages = [
    { role: "developer", content: "Only return the contents of a typescript file that writes and calls a function returning and printing the first 10 primes as an array. Output only code with no additional characters, don't wrap it in template literals, so it can be pasted directly into a file and work when called." },
    { role: "user", content: "Write a typescript file that returns a list of the first 10 prime numbers." }
];

const generatorResponse = await generatorAgent.sendPrompt(generatorMessages);
let codeContent = generatorResponse.content;


if (codeContent === null) {
  codeContent = '';
}

await fileWriter(codeContent, 'sandbox/primes.ts');
console.log('sandbox/primes.ts written!');

// const generatorId = '1';
// const generatorAgent = new Agent(generatorId);
// const generatorMessages = [
//     { role: "developer", content: "Only return the contents of a typescript file based on the prompt that uses import, and async await syntax. Also follow development best practices. Return no additional characters." },
//     { role: "user", content: "Write a typescript file that returns a list of the first 10 prime numbers." }
// ];

// const runnerId = '2';
// const writerAgent = new Agent(runnerId);
// const writerMessages = [
//     { role: "developer", content: "Only return the contents of a typescript file based on the prompt that uses import, and async await syntax. Also follow development best practices. Return no additional characters." },
//     { role: "user", content: "Write a typescript file that returns a list of the first 10 prime numbers." }
// ];


// const execAsync = promisify(exec);

// async function runCommand(command: string): Promise<void> {
//     try {
//         console.log('Input Command: ', command);
//         const { stdout, stderr } = await execAsync(command);
//         if (stdout) console.log("Output:", stdout.trim());
//         if (stderr) console.error("Error:", stderr.trim());
//     } catch (error) {
//         console.error("Command execution failed:", error);
//     }
//   }

// if(command != null){
//     await runCommand(command);
// }

