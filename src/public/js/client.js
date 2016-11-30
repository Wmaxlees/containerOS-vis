'use strict';
{
  /**
   * User-declared maximum number of containers which can be created
   * @type {Number}
   */
  const MAX_CONTAINERS = 4; 
  
  /**
   * User-declared cycle speed of the polling operation
   * @type {Number}
   */
  const LOOP_MS = 3000;

  /**
   * monitors the creation and mapping of containers to visualizer ids
   * @type {Object}
   * @example
   * containers.newId('myContainerId') // creates a mapping of myContainerId to an integer, or false
   * containers.getId('myContainerId') // returns the mapped integer, or false
   * containers.deleteId('myContainerId')
   */
  var containers = {
    map: {},
    newId: (id) => { 
      let possibleIds = [];
      for (let i = 0; i < MAX_CONTAINERS; ++i) 
        possibleIds.push(i);
      let unusedIds = _.difference(possibleIds, _.values(containers.map));
      if (unusedIds.length > 0) {
        containers.map[id] = unusedIds[0];
        return containers.map[id];
      } else {
        return false;
      }
    },
    deleteId: (id) => {
      if (containers.map.hasOwnProperty(id)) {
        delete containers.map[id];
        return true;
      } else {
        return false;
      }
    },
    getId: (id) => {
      return containers.map.hasOwnProperty(id) ? containers.map[id] : false; 
    },
    generateChartData: (prefixValue) => {
      let output = [];
      if (prefixValue)
        output.push(prefixValue)
      for (let i = 0; i < MAX_CONTAINERS; ++i)
        output.push(null)
      return output;
    }
  };

  /**
   * Defines the Collection for Container GET Queries
   * @type {Backbone.Collection}
   */
  var ContainerData = Backbone.Collection.extend({
    url: '/query',
  })
  var data = new ContainerData()
  var CreateContainerEndpoint = Backbone.Collection.extend({
    url: '/run?script=1'
  }) 
  var createContainer = new CreateContainerEndpoint()

  /**
   * Initializes the client's list of currently active Docker containers
   */
  function loadInitialContainerIds(callback) {
    data.fetch({reset: true})
      .then((d,res,opt) => {
        if (Array.isArray(d)) {
          d.forEach((e,i,a) => {
            containers.newId(e.id)  
          })
          console.log(containers.map) // show initial container id mapping
          callback()
        }
      })
      .catch((err) => {
        console.log('unable to find initial set of containers')
        console.log(err)
      })
  }

  /**
   * flag to identify if the polling loop should continue
   * @type {Boolean}
   */
  var activePolling = false;

  /**
   * Polls the Docker container data from the server
   */
  function pollNewData() {
    data.fetch({reset: true})
      .then((d,res,opt) => {
        if (activePolling && Array.isArray(d)) {
          var cpuData = containers.generateChartData(Date.now())
            , memData = containers.generateChartData();
          d.forEach((e, i, a) => {
            var chartId = containers.getId(e.id)
            if (chartId === false) {
              chartId = containers.newId(e.id)
            }
            if (chartId !== false) {
              cpuData[chartId+1] = Number.parseFloat(e.cpu)
              memData[chartId] = Number.parseFloat(e.memory)
            }
          }) 
          Charts.updateCPU(cpuData)
          Charts.updateMem(memData)
        } 
      })
      .catch((err) => {
        console.log('aww, shell shock.')
        console.log(err)
      })
  }

  /**
   * Runs a loop of polling Docker data until the user flips the switch off
   */
  function loopPolling() {
    setTimeout(function () {
      if (activePolling) {
        // console.log('loopPolling() running')
        console.log(containers.map)
        pollNewData();
        loopPolling();
      }
    }, LOOP_MS);
  }
 
  function createNewContainer(callback) {
    createContainer.fetch()
      .then(() => {
        callback(null, 'good')
      })
      .catch((err) => {
        callback(err)
      })
  }

  $(document).ready(function() {
    
    Charts.initCharts(); 

    loadInitialContainerIds(() => {
      $('#polling button').click(function(){
        if($(this).hasClass('locked_active') || $(this).hasClass('unlocked_inactive')){
          /* code to do when unlocking */
          $('#polling_status').html('Polling every ' + LOOP_MS / 1000 + ' seconds.');
          activePolling = true;
          loopPolling();
        }else{
          /* code to do when locking */
          $('#polling_status').html('Polling is inactive.');
          activePolling = false;
        }
        /* reverse locking status */
        $('#polling button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
        $('#polling button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
      });  
    });    
  });  
}