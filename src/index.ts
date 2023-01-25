import {
  engine, executeTask, Material
} from '@dcl/sdk/ecs'
import { Color3 } from '@dcl/sdk/math'

import { createCube } from './factory'
import { bounceScalingSystem, circularSystem, spawnerSystem } from './systems'

import { setupUi } from './ui'

import { getWallets } from '@talismn/connect-wallets';

const DAPP_NAME = "AUNO";

// export all the functions required to make the scene work
export * from '@dcl/sdk'

const wallets = getWallets();
      try {
        await wallets[0].enable(DAPP_NAME);
        const unsubscribe = await wallets[0].subscribeAccounts((accounts) => {
          // Save accounts...
          // Also save the selected wallet name as well...
        });
      } catch (err) {
        // Handle error. Refer to `libs/wallets/src/lib/errors`
      }

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(spawnerSystem)
engine.addSystem(bounceScalingSystem)

// Initial function executed when scene is evaluated and after systems are created
executeTask(async function () {
  // Create my main cube and color it.
  const cube = createCube(8, 1, 8)
  Material.setPbrMaterial(cube, { albedoColor: Color3.fromHexString('#FFD96C') })
})

setupUi()