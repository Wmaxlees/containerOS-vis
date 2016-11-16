'use strict';
{
  $( document ).ready(function() {
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
      }
      

      function fetchSuccess (d, res, opt) {
        console.log('fetch success')
        if (Array.isArray(d)) {
          d.forEach((e, i, a) => {
            // parse data 

            // call francsisco's visualization functions with current data 
          })          
        } else {
          var blah = 0;
          console.log(`at time ${blah}, received response that wasn't an array`)
        }


      }

      function fetchFailure (d, res, opt) {
        console.log('fetch failure')
      }

      pollNewData()
  });  
}