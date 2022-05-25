import { Command } from 'commander';
import { sync } from '../../index';
import { clirun } from './utils';
import { makeBranchOption, makeForceOption, makeYesOption } from './utils/options';

function makeInitCLI(program: Command) {
  const command = new Command('init')
    .description('Initialize a Curvenote project')
    .addOption(makeForceOption())
    .addOption(makeBranchOption())
    .action(clirun(sync.init, { program, hideNoTokenWarning: true }));
  return command;
}

function makePullCLI(program: Command) {
  const command = new Command('pull')
    .description('Pull all remote information for a Curvenote project')
    .argument('[folder]', 'The location of the content to pull, defaults to the currect directory')
    .addOption(makeYesOption())
    .action(clirun(sync.pull, { program, requireConfig: true }));
  return command;
}

function makeCloneCLI(program: Command) {
  const command = new Command('clone')
    .description('Clone a Curvenote project')
    .argument('[remote]', 'Curvenote link to a project')
    .argument('[folder]', 'The location of the content to clone')
    .action(clirun(sync.clone, { program, requireConfig: true }));
  return command;
}

export function addSyncCLI(program: Command) {
  program.addCommand(makeInitCLI(program));
  program.addCommand(makeCloneCLI(program));
  program.addCommand(makePullCLI(program));
}
