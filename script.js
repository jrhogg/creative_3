var app = new Vue({
  el: '#app',
  data: {
    title: '',
    text: '',
    loading: true,
    addedName: '',
    addedComment: '',
    addedTime: '',
    comments: {},
    number: '',
  },
  created: function() {
    this.load("falconheavy");
  },
  methods: {
    load: function(type) {
      this.loading = true;
      this.type = type;
      fetch('https://api.spacexdata.com/v2/rockets/' + type).then(response => {
	return response.json();
      }).then(json => {
	this.loading = false;
        var results = "";
        results += "<h1>"+json.name+"</h1>";
        results += "<ul>\n<li>"+json.description+"</li>";
        results += "<li>This rocket can send different payloads to the following orbits: ";
        for(var i = 0; i < json.payload_weights.length;i++){
          results += "<br>"+json.payload_weights[i].name + ": " + json.payload_weights[i].kg + "kg";
        }
        results += "</li>";
        results += "<li><p>Cost per launch: " + json.cost_per_launch+"</p></li>";
        results += "<li><p>Launch success rate: " + json.success_rate_pct+"</p></li>";
        results += "We hope the previous information was helpful."
        results += "If you'd like more information, please call us at 990-9999</li>"
        results += "</ul>";
	this.text = results;
	return true;
      }).catch(err => {
	loading = false;
	this.text = 'Unable to retrive data';
      });
    },
    falHeavy: function() {
      this.load("falconheavy");
      this.title = "Falcon Heavy";
      this.number = 0;
    },
    fal1: function() {
      this.load("falcon1");
      this.title = "Falcon 1";
      this.number = 1;
    },
    fal9: function() {
      this.load("falcon9");
      this.title = "Falcon 9";
      this.number = 2;
    },
    addComment: function() {
      if (!(this.number in this.comments))
	Vue.set(app.comments, this.number, new Array);
      var date = new Date();
      this.addedTime = (date.getMonth()+1) + '/'+date.getDate() + '/' + date.getFullYear();
      var minutes = date.getMinutes();
      if ( minutes < 10 ){
	minutes = '0' + minutes;
      }
      this.addedTime += ' ' + date.getHours()+ ':' + minutes;
      this.comments[this.number].push({author:this.addedName,text:this.addedComment,time:this.addedTime});
      this.addedName = '';
      this.addedComment = '';
      this.addedTime = '';
    },
    computed: {
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
	return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  }
});
