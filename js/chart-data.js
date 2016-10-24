var randomScalingFactor = function() {
    return Math.round(Math.random() * 100)
};

var randomGenerator = function(){
    return Math.round(Math.random()*100 + 250)
};

var day = 25;
var f_restData;
var f_containData;
var containData1 = [7, 5, 12, 13, 15];
var restData1 = [5, 6, 15, 15, 12, 7, 14, 11, 4, 9, 12, 4, 11, 9, 13, 13, 7, 13, 5, 13, 12, 13, 5, 16, 6, 7];
var containData2 = [4, 7, 9, 14, 16];
var restData2 = [3, 8, 9, 14, 16, 18, 20, 12, 22, 10, 13, 4, 5, 6, 4, 13, 10, 12, 3, 2, 4, 8, 3, 4, 13];
var socket = io();
var origin = 35;
var sum = origin / 0.103 - 52;
var Egoal = sum / day;
var avg_last_month_neigh = randomGenerator();

function Goal_submit(){
	var val = document.getElementById("Goal_input");
	//alert(val.value);
	document.getElementById("EGoal_show").innerHTML = val.value+" CAD";
	origin = val.value;
}

function Goal_submit2(){
	var val = document.getElementById("Goal_input2");
	//alert(val.value);
	document.getElementById("WGoal_show").innerHTML = val.value+" Lts";

}


function neighbour_compare(){
    var my_last_month = 300;
    var diff = my_last_month - avg_last_month_neigh;
    if(diff > 0)
      $("#n_msg").html('You are consuming '+diff+' kW more than your neighbour!');
    else{
      $("#n_msg").html('Congrats!!You are saving more electricity than your neighbours!');
    }
}

function demo() {
    //alert('clicked');
    //socket.emit('phone', {test: 'yes'});
    //alert(f_restData[0]);
    var checkTime = setInterval(countDown, 3000);
}

function countDown() {

    var chart1 = document.getElementById("line-chart").getContext("2d");
    update(lineChartData, containData1, restData1);
    var myLine = new Chart(chart1).Line(lineChartData, {
        responsive: true
    });


}

function update(data, containData, restData) {
    if (day > 0) {
        containData.push(restData[25 - day]);
        sum = sum - restData1[25 - day];
        day--;
        if (day == 0)
            Egoal = sum;
        else
            Egoal = sum / day;
        if (Egoal > 15)
            Egoal = 15;
        for (let i = 0; i < 30; i++) {
            lineChartData["datasets"][1]["data"][i] = Egoal;
        }
				if(restData[25 - day] > Egoal){
						socket.emit('Notification', {test:"true"});
				}
    } else {
        clearInterval(checkTime);
    }
}



var lineChartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    datasets: [

        {
            label: "My Second dataset",
            fillColor: "rgba(48, 164, 255, 0.2)",
            strokeColor: "rgba(48, 164, 255, 1)",
            pointColor: "rgba(48, 164, 255, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(48, 164, 255, 1)",
            data: containData1
        },

        {
            label: "My Goal",
            fillColor: "rgba(225,0,0,0)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal, Egoal]
        }


    ]

}

var lineChartData2 = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    datasets: [{
            label: "My Second dataset",
            fillColor: "rgba(48, 164, 255, 0.2)",
            strokeColor: "rgba(48, 164, 255, 1)",
            pointColor: "rgba(48, 164, 255, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(48, 164, 255, 1)",
            data: [562, 590, 561, 502, 597, 627, 772, 712, 757, 792, 1067, 348, 749, 800, 926, 704, 973, 660, 975, 662, 702, 391, 754, 761, 778, 499, 334, 558, 1069, 183, 727]
        },

        {
            label: "My Goal",
            fillColor: "rgba(225,0,0,0)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750]
        }


    ]

}

var barChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [30, 25, 28, 23, 26, 17, 28]
    }, {
        fillColor: "rgba(48, 164, 255, 0.2)",
        strokeColor: "rgba(48, 164, 255, 0.8)",
        highlightFill: "rgba(48, 164, 255, 0.75)",
        highlightStroke: "rgba(48, 164, 255, 1)",
        data: [15, 17, 18, 16, 20, 15, 16]
    }]

}

var pieData = [{
        value: 300,
        color: "#30a5ff",
        highlight: "#62b9fb",
        label: "Between 6 PM and 12 AM"
    }, {
        value: 50,
        color: "#ffb53e",
        highlight: "#fac878",
        label: "Between 12 AM and 9 AM"
    }, {
        value: 100,
        color: "#1ebfae",
        highlight: "#3cdfce",
        label: "Between 3 PM and 6 PM"
    }, {
        value: 120,
        color: "#f9243f",
        highlight: "#f6495f",
        label: "Between 9 AM and 2PM"
    }

];

window.onload = function() {
    //socket.emit('which phone', {msg: 'yes'});
    //socket.on('which phone done', function(msg){
        /*
        if(msg.p){
            f_restData = restData1;
            f_containData = containData1;
            //alert(f_containData[0]);
        }else{
            f_restData = restData2;
            f_containData = containData2;
            //alert(f_containData[0]);
        }
        lineChartData["datasets"][0]["data"] = f_containData;
        */

        neighbour_compare()

        var chart1 = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(chart1).Line(lineChartData, {
            responsive: true
        });

        var chart5 = document.getElementById("line-chart2").getContext("2d");
        window.myLine2 = new Chart(chart5).Line(lineChartData2, {
            responsive: true
        });

        var chart2 = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(chart2).Bar(barChartData, {
            responsive: true
        });

        var chart4 = document.getElementById("pie-chart").getContext("2d");
        window.myPie = new Chart(chart4).Pie(pieData, {
            responsive: true
        });

    //});

};
