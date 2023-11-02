/**
 * This file is a patch to resolve an issue with Events firing twice in Angular. The fix was taken from
 * this discussion/thread and should be removed once the PR to actually fix the issue has been merged/released
 * by the Stencil team.
 *
 * https://github.com/ionic-team/stencil-ds-output-targets/issues/81
 *
 * @author @razvangeangu
 */

import { BuildCtx, CompilerCtx, Config, OutputTargetCustom } from '@stencil/core/internal';
import fs from 'fs-extra';
import path from 'path';

const runAngularOutputTargetFix = async (outputTarget: IAngularOutputTarget) => {
  // NOTE that the './' path provided is used in lieu of __dirname while requires node/types that
  // conflict with angular types.  Thus, the location of this file and the path specified in
  // stencil.config.ts for the angularOutputTargetFix go hand in hand.
  const directivesUtilsPath = path.resolve('./', outputTarget.directivesUtilsFile);

  let directivesUtilsString;

  directivesUtilsString = await fs.promises.readFile(directivesUtilsPath, { encoding: 'utf-8' });
  directivesUtilsString = directivesUtilsString.replace(
    "import { fromEvent } from 'rxjs';",
    "import { EventEmitter } from '@angular/core';"
  );
  directivesUtilsString = directivesUtilsString.replace(
    'instance[eventName] = fromEvent(el, eventName)',
    'instance[eventName] = new EventEmitter()'
  );

  await fs.promises.writeFile(directivesUtilsPath, directivesUtilsString);
};

interface IAngularOutputTarget {
  directivesUtilsFile: string;
}

export const angularOutputTargetFix = (outputTarget: IAngularOutputTarget): OutputTargetCustom => ({
  type: 'custom',
  name: 'angular-library-fix',
  generator: async (_config: Config, compilerCtx: CompilerCtx, buildCtx: BuildCtx) => {
    const timespan = buildCtx.createTimeSpan('generate angular proxy utils fix started', true);

    await new Promise<void>((resolve) => {
      compilerCtx.events.on('buildLog', (log) => {
        if (log.messages.findIndex((elm) => elm.includes('generate angular-library finished')) !== -1) {
          resolve();
        }
      });
    });

    compilerCtx.events.on('buildLog', (log) => {
      if (log.messages.findIndex((elm) => elm.includes('build finished, watching for changes...')) !== -1) {
        runAngularOutputTargetFix(outputTarget);
      }
    });

    await runAngularOutputTargetFix(outputTarget);

    timespan.finish('generate angular proxy utiils fix finished');
  }
});
