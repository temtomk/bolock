import { Command } from 'commander';
import readline from 'readline';
import path from 'path';
import { createReactTemplate } from './templates/react';
import { createNestJSTemplate } from './templates/nestjs';
import { createHardhatTemplate } from './templates/hardhat';
import { createDirectory } from './utils';

const program = new Command();

function question(rl: readline.Interface, query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function promptForChoice(rl: readline.Interface, message: string, choices: string[]): Promise<string> {
  console.log(message);
  choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });

  while (true) {
    const answer = await question(rl, 'Enter your choice (number): ');
    const choiceIndex = parseInt(answer) - 1;
    if (choiceIndex >= 0 && choiceIndex < choices.length) {
      return choices[choiceIndex];
    }
    console.log('Invalid choice. Please try again.');
  }
}

program
  .version('1.0.0')
  .description('A CLI tool to create project templates for different tech stacks')
  .action(async () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      const stack = await promptForChoice(rl, 'Which tech stack would you like to use?', ['React', 'Nest.js', 'Hardhat']);
      const projectName = await question(rl, 'Enter project name: ');

      const projectsDir = path.join(process.cwd(), 'projects');
      await createDirectory(projectsDir);

      const projectDir = path.join(projectsDir, projectName);
      await createDirectory(projectDir);

      switch (stack.toLowerCase()) {
        case 'react':
          await createReactTemplate(projectDir);
          console.log(`\nTo start your React project:`);
          console.log(`cd ${path.relative(process.cwd(), projectDir)}`);
          console.log(`npm start`);
          break;
        case 'nest.js':
          await createNestJSTemplate(projectDir);
          console.log(`\nTo start your NestJS project:`);
          console.log(`cd ${path.relative(process.cwd(), projectDir)}`);
          console.log(`npm run start:dev`);
          break;
        case 'hardhat':
          await createHardhatTemplate(projectDir);
          console.log(`\nTo compile your Hardhat project:`);
          console.log(`cd ${path.relative(process.cwd(), projectDir)}`);
          console.log(`npx hardhat compile`);
          break;
        default:
          console.error('Invalid selection');
          process.exit(1);
      }

      console.log(`\nProject created successfully in ${projectDir}`);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      rl.close();
      process.exit(0);  // 프로세스를 명시적으로 종료합니다.
    }
  });

program.parse(process.argv);
