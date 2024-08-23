import { Command } from "commander";
import { checkbox, select, Separator } from "@inquirer/prompts";

const program = new Command();

program.version("1.0.0").description("블록체인 프로젝트 빌더");

program
  .command("build")
  .description("프로젝트 빌드 선택")
  .action(async () => {
    const components = await checkbox({
      message: "블록체인 프로젝트 빌더를 선택하시겠습니까?",
      choices: [
        { name: "web", value: "web" },
        { name: "server", value: "server" },
        { name: "blockchain", value: "blockchain" },
      ],
    });

    for (const component of components) {
      switch (component) {
        case "web":
          await chooseWebFramework();
          break;
        case "server":
          await chooseServerFramework();
          break;
        case "blockchain":
          await chooseBlockchainFramework();
          break;
      }
    }
  });

async function chooseWebFramework() {
  const webFramework = await select({
    message: "어떤 웹 프레임워크를 선택하시겠습니까?",
    choices: [
      { name: "React", value: "react" },
      { name: "next.js", value: "next.js" },
    ],
  });
  console.log(`선택하신 웹 프레임워크: ${webFramework}`);
}

async function chooseServerFramework() {
  const serverFramework = await select({
    message: "어떤 서버 프레임워크를 선택하시겠습니까?",
    choices: [
      { name: "nest.js", value: "nest.js" },
      { name: "fastapi", value: "fastapi" },
    ],
  });
  console.log(`선택하신 서버 프레임워크: ${serverFramework}`);
}

async function chooseBlockchainFramework() {
  const blockchainFramework = await select({
    message: "어떤 블록체인 프레임워크를 선택하시겠습니까?",
    choices: [
      { name: "hardhat", value: "hardhat" },
      { name: "forge", value: "forge" },
    ],
  });
  console.log(`선택하신 블록체인 프레임워크: ${blockchainFramework}`);
}

program.parse(process.argv);
