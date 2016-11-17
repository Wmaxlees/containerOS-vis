'use strict';
{
  var activePolling = false;

  const MAX_CONTAINERS = 2; 
  var containers = {
    map: {},
    hasSpaceForNew: () => { return Object.keys(containers.map).length < MAX_CONTAINERS; },
    newId: (id) => { 
      var possibleIds = [];
      for (var i = 0; i < MAX_CONTAINERS; ++i) 
        possibleIds.push(i);
      var unusedIds = _.difference(possibleIds, _.values(containers.map));
      if (unusedIds.length > 0) {
        containers.map[id] = unusedIds[0];
        return true;
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
    }
  };

  $( document ).ready(function() {
      
      $('#toggle_event_editing button').click(function(){
        if($(this).hasClass('locked_active') || $(this).hasClass('unlocked_inactive')){
          /* code to do when unlocking */
          // $('#switch_status').html('Switched on.');
          activePolling = true;
          pollNewData();
        }else{
          /* code to do when locking */
          // $('#switch_status').html('Switched off.');
          activePolling = false;
        }
  
        /* reverse locking status */
        $('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
        $('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
      });

      console.log('client.js')
      // @TODO: define data model if we want
      // var DataModel = Backbone.Model.extend({
      //   defaults: {
      //     id: null,
      //     memory: null,
      //     cpu: null
      //   }
      // })
      var DataCollection = Backbone.Collection.extend({
        url: '/query',
        // model: DataModel
      })
      var data = new DataCollection()
      

      function pollNewData() {
        data.fetch(fetchSuccess,fetchFailure,{reset: true})
        
        function fetchSuccess (d, res, opt) {
          console.log('fetch success')
          if (activePolling && Array.isArray(d)) {
            var cpuData = [Date.now()] 
              , memData = [];
            d.forEach((e, i, a) => {
              // parse data 
              cpuData.push(e.cpu)
              memData.push(e.mem)
            })
            Charts.updateCPU(cpuData)
            Charts.updateMem(memData)
          } else {
            var blah = 0;
            console.log(`at time ${blah}, received response that wasn't an array`)
          }
        }

        function fetchFailure (d, res, opt) {
          console.log('fetch failure')
        }
      }

      function loopPolling() {
        setTimeout(function () {
          console.log('loopPolling')
          pollNewData();
          if (activePolling)
            loopPolling();
        }, 1000);
      }

      // manual testing
      
  });  
}