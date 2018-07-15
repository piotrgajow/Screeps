# Screeps codebase

This is my code for running [Screeps](https://screeps.com/) - an open-source sandbox MMO RTS game for programmers.

Code is written in [TypeScript](https://www.typescriptlang.org/) and was based on [Screeps Typescript Starter](https://github.com/screepers/screeps-typescript-starter).

## Usage

To upload the code onto Screeps account you should:
 1. Copy `screeps.sample.json` file and rename it to `screeps.json`.
 2. Replace value of `token` property inside the file to the value of your [Screeps token](https://screeps.com/a/#!/account/auth-tokens).
 3. Execute `npm run push-main` or `npm run push-test` to upload code into Screeps main or test branch respectively.
 4. Switch to the branch in Screeps.

## Organization

Main code loop consists of executing 4 modules:

- Defence system

  Detects enemy creeps in occupied room and commands towers to attack them.
  
- Creep commanding

  Issues creeps commands based on their role and active task.

- Creep spawning

  Decides creeps of which roles should be spawned based on set targets and current creep counts.

- Memory cleanup

  Removes data from memory that is not needed any more.

## Creep commanding

Creeps are organized in roles and tasks.

Role is assigned to a creep upon spawning. Role is used to decide on what task the creep should work on.

Task is used to decide what creep should do. When task is assigned to a creep it finds its target and saves it to the creep memory. Each tick it works on the task and checks finish condition. If tasks is finished, new one will be assigned by the role.

The existing roles are:

### Worker [300]

Starter role. Will harvest energy from source and fill spawn, build, fill extensions and upgrade controller.

### Builder [300]

Used to build and maintain constructions. Will pick up energy from storage, build new constructions and then repair existing ones.
Requires: storage or containers

### Energy Distributor [300]

Will pick up energy from from storage and distribute it to spawns, extensions, towers and upgraders.
Requires: storage or containers

### Hauler [300]

Will move resources from containers, tombstones and dropped to storage.
Requires: storage and containers

### Idler

Does nothing. Fallback role used in case of errors.

### Miner [50 + 100*n] (max 550)

Will find mine flag without miner creep occupying the position and move to it. Then it will mine adjacent source and drop the energy into a container.

Requires mine flag (containing `mine` keyword) on a position adjacent to the source. Flag should have saved in memory the source id in `source` property. A container should be present in the position.

### Upgrader [200 * n]

Will look for empty position with upgrade flag and move to it. Then it will upgrade the controller. The role relies on Energy Distributor to be given energy.

Requires: upgrade flag (containing `upg` keyword) on a position in range of controller upgrading.

### Remote Miner [450]

Will occupy remote mine flag location, build a container and mine nearby source

Requires flag with `remote-mine` prefix in range 1 of source

### Remote Hauler [300]

Will transfer energy from remote mine container to storage

Requires: storage and container in remote mine location

## Creep Spawning

Creep spawning mechanism is based on the value of `spawn-order` parameter defined in spawn memory. The value should be an array of single key-value pair objects, where key is the role name and value is the target creep count.

E.g. `[{ harvester: 1 }, { builder: 1 }, { harvester: 3 }]`

- if there is no harvesters it will spawn one
- if there is at least one harvester but no builders will spawn a builder
- if there is at least one builder but less then 3 harvesters will spawn a harvester
