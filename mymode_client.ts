/// <reference path="node_modules/@citizenfx/client/index.d.ts" />
//
on('onClientGameTypeStart', () => {
  exports.spawnmanager.setAutoSpawnCallback(() => {
    CreateVehicle("akuma", 686.245,
      577.950,
      130.461,
      0,
      false,
      false
    )
    exports.spawnmanager.spawnPlayer({
      x: 686.245,
      y: 577.950,
      z: 130.461,
      model: 'a_m_m_skater_01'
    }, () => {
      emit('chat:addMessage', {
        args: [
          'Hi, there!'
        ]
      })
    });

    exports.spawnmanager.spawnVehicle()
  });

  exports.spawnmanager.setAutoSpawn(true)
  exports.spawnmanager.forceRespawn()
});