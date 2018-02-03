# Screeps codebase

This is my code for running [Screeps](https://screeps.com/) - an open-source sandbox MMO RTS game for programmers.

Code is written in [TypeScript](https://www.typescriptlang.org/) and was based on [Screeps Typescript Starter](https://github.com/screepers/screeps-typescript-starter).

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

### Builder

Used to build and maintain constructions. Will pick up energy from storage, build new constructions and then repair existing ones.

### Energy Distributor

Will pick up energy from from storage and distribute it to spawns, extensions, towers and upgraders.

### Harvester

Basic creep which will extract energy from source, fill spawn and extensions and upgrade controller

### Hauler

Will move energy from containers to storage.

### Idler

Does nothing. Fallback role used in case of errors.

### Miner

Will find mine flag without miner creep occupying the position and move to it. Then it will mine adjacent source and drop the energy into a container.

Requires mine flag (containing `mine` keyword) on a position adjacent to the source. Flag should have saved in memory the source id in `source` property. A container should be present in the position.

### Scavenger

Will search for dropped energy and move it to storage.

### Upgrader

Will look for empty position with upgrade flag and move to it. Then it will upgrade the controller. The role relies on Energy Distributor to be given energy.

Requires upgrade flag (containing `upg` keyword) on a position in range of controller upgrading.

## Creep Spawning

Creep spawning mechanism is based on the value of `spawn-order` parameter defined in spawn memory. The value should be an array of single key-value pair objects, where key is the role name and value is the target creep count.

E.g. `[{ harvester: 1 }, { builder: 1 }, { harvester: 3 }]`

- if there is no harvesters it will spawn one
- if there is at least one harvester but no builders will spawn a builder
- if there is at least one builder but less then 3 harvesters will spawn a harvester
