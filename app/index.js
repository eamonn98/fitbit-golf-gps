import { geolocation } from "geolocation";
import { me } from "appbit";
import { vibration } from "haptics";

import document from "document";

const courseTitle = document.getElementById("course-title");
const holeNumber = document.getElementById("hole-number");
const frontLabel = document.getElementById("front-label");
const frontData = document.getElementById("front-data");
const middleLabel = document.getElementById("middle-label");
const middleData = document.getElementById("middle-data");
const backLabel = document.getElementById("back-label");
const backData = document.getElementById("back-data");

let btnTR = document.getElementById("btn-tr");
let btnBR = document.getElementById("btn-br");

const debugTime = document.getElementById("debug-time");

const toRad = Math.PI/180;

const kmConv = {
  'yards': 1093.61,
  'metres': 1000.0
}

var gpsPos = [0, 0];
var lastGpsTime = new Date();

var config = {
  distanceUnit: 'yards',
  currentHole: 1,
  hasGPS: false
}

var currentCourse = [
    {
        "hole": "1",
        "distance": 0.457805695382904,
        "green": {
            "coords": [
                53.26118686760921,
                -6.615789380089881
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26132143364222,
                        -6.615863948137017
                    ],
                    "distance": 0.20680040325672752
                },
                "middle": {
                    "coords": [
                        53.26118686760921,
                        -6.615789380089881
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.26105924860472,
                        -6.615701405935205
                    ],
                    "distance": 0.2378940901841381
                }
            }
        }
    },
    {
        "hole": "2",
        "distance": 0.36261174851818445,
        "green": {
            "coords": [
                53.26383657210502,
                -6.617621721114988
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.263640679276726,
                        -6.617560089815231
                    ],
                    "distance": 0.013562128336143587
                },
                "middle": {
                    "coords": [
                        53.26383657210502,
                        -6.617621721114988
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.263940811600406,
                        -6.617630637523787
                    ],
                    "distance": 0.047263544784111405
                }
            }
        }
    },
    {
        "hole": "3",
        "distance": 0.34528331593407147,
        "green": {
            "coords": [
                53.260231933133625,
                -6.618003980358862
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.260302770494576,
                        -6.6180096332376
                    ],
                    "distance": 0.09408628968962593
                },
                "middle": {
                    "coords": [
                        53.260231933133625,
                        -6.618003980358862
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.26013378514363,
                        -6.618000848231606
                    ],
                    "distance": 0.112885686852332
                }
            }
        }
    },
    {
        "hole": "4",
        "distance": 0.33613789298412283,
        "green": {
            "coords": [
                53.26366435578535,
                -6.618538404492465
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.263795346185454,
                        -6.61851150139827
                    ],
                    "distance": 0.026964596254948108
                },
                "middle": {
                    "coords": [
                        53.26366435578535,
                        -6.618538404492465
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.263795346185454,
                        -6.61851150139827
                    ],
                    "distance": 0.026964596254948108
                }
            }
        }
    },
    {
        "hole": "5",
        "distance": 0.35813816410165134,
        "green": {
            "coords": [
                53.260017782339794,
                -6.618976733283354
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26013632180449,
                        -6.6190915763751645
                    ],
                    "distance": 0.1121780917834803
                },
                "middle": {
                    "coords": [
                        53.260017782339794,
                        -6.618976733283354
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.25989369037836,
                        -6.6189129494853844
                    ],
                    "distance": 0.1416578204103326
                }
            }
        }
    },
    {
        "hole": "6",
        "distance": 0.18311279104023348,
        "green": {
            "coords": [
                53.26024760265226,
                -6.615386501435109
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26021024673872,
                        -6.615633073284002
                    ],
                    "distance": 0.16725847650663977
                },
                "middle": {
                    "coords": [
                        53.26024760265226,
                        -6.615386501435109
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.26027645742616,
                        -6.61513537263968
                    ],
                    "distance": 0.20117169302899232
                }
            }
        }
    },
    {
        "hole": "7",
        "distance": 0.3241180573863594,
        "green": {
            "coords": [
                53.26144604736583,
                -6.612348036658781
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.261524417242,
                        -6.612228287197075
                    ],
                    "distance": 0.09876909463275706
                },
                "middle": {
                    "coords": [
                        53.26144604736583,
                        -6.612348036658781
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.261524417242,
                        -6.612228287197075
                    ],
                    "distance": 0.09876909463275706
                }
            }
        }
    },
    {
        "hole": "8",
        "distance": 0.12243559737255096,
        "green": {
            "coords": [
                53.26000376057166,
                -6.612600528983911
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26005928796009,
                        -6.61257160536321
                    ],
                    "distance": 0.11646978667122461
                },
                "middle": {
                    "coords": [
                        53.26000376057166,
                        -6.612600528983911
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.26005928796009,
                        -6.61257160536321
                    ],
                    "distance": 0.11646978667122461
                }
            }
        }
    },
    {
        "hole": "9",
        "distance": 0.48172193799100493,
        "green": {
            "coords": [
                53.25954838550332,
                -6.619965986630719
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.25952529095261,
                        -6.619730582223379
                    ],
                    "distance": 0.06496337934318462
                },
                "middle": {
                    "coords": [
                        53.25954838550332,
                        -6.619965986630719
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.25956104385047,
                        -6.620170849427617
                    ],
                    "distance": 0.09451673046822388
                }
            }
        }
    },
    {
        "hole": "10",
        "distance": 0.4518041495730105,
        "green": {
            "coords": [
                53.26360439499838,
                -6.62027438889823
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26343886982368,
                        -6.620289378757645
                    ],
                    "distance": 0.07234591122809436
                },
                "middle": {
                    "coords": [
                        53.26360439499838,
                        -6.62027438889823
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.26375557434967,
                        -6.620267542502836
                    ],
                    "distance": 0.10759178213106987
                }
            }
        }
    },
    {
        "hole": "11",
        "distance": 0.35214114479680225
    },
    {
        "hole": "12",
        "distance": 0.37323453900401693,
        "green": {
            "coords": [
                53.25911927224711,
                -6.626400317000809
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.259212588750366,
                        -6.626199208231534
                    ],
                    "distance": 0.13332796666181632
                },
                "middle": {
                    "coords": [
                        53.25911927224711,
                        -6.626400317000809
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.259041203174064,
                        -6.626580650785088
                    ],
                    "distance": 0.1650600673120978
                }
            }
        }
    },
    {
        "hole": "13",
        "distance": 0.32866631066727126,
        "green": {
            "coords": [
                53.259944775203834,
                -6.622111792488057
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.259877985607716,
                        -6.622335477318694
                    ],
                    "distance": 0.08829802777573241
                },
                "middle": {
                    "coords": [
                        53.259944775203834,
                        -6.622111792488057
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.260012736015,
                        -6.621914699533436
                    ],
                    "distance": 0.12004455131614225
                }
            }
        }
    },
    {
        "hole": "14",
        "distance": 0.15600148240140496,
        "green": {
            "coords": [
                53.258941977117885,
                -6.622292199022025
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.2589841790388,
                        -6.621975840675347
                    ],
                    "distance": 0.1352756715970142
                },
                "middle": {
                    "coords": [
                        53.258941977117885,
                        -6.622292199022025
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.258922275717694,
                        -6.622539124268176
                    ],
                    "distance": 0.17337049189153245
                }
            }
        }
    },
    {
        "hole": "15",
        "distance": 0.35636364606340465,
        "green": {
            "coords": [
                53.258459936851565,
                -6.626968424688309
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.25848469168631,
                        -6.626742355177526
                    ],
                    "distance": 0.10691092081455357
                },
                "middle": {
                    "coords": [
                        53.258459936851565,
                        -6.626968424688309
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.25843968162538,
                        -6.627128239126184
                    ],
                    "distance": 0.13306234503601133
                }
            }
        }
    },
    {
        "hole": "16",
        "distance": 0.41512725466913153,
        "green": {
            "coords": [
                53.26127337347903,
                -6.624120758193498
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26121705066674,
                        -6.624354891561403
                    ],
                    "distance": 0.053701059828749
                },
                "middle": {
                    "coords": [
                        53.26127337347903,
                        -6.624120758193498
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.261336879481874,
                        -6.623921030146693
                    ],
                    "distance": 0.08548615833837682
                }
            }
        }
    },
    {
        "hole": "17",
        "distance": 0.35407048337178937,
        "green": {
            "coords": [
                53.26380989871792,
                -6.6212472180525435
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26371597510537,
                        -6.621398213759351
                    ],
                    "distance": 0.11318703556419422
                },
                "middle": {
                    "coords": [
                        53.26380989871792,
                        -6.6212472180525435
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.26391072072533,
                        -6.621127137990048
                    ],
                    "distance": 0.14136456054485302
                }
            }
        }
    },
    {
        "hole": "18",
        "distance": 0.12017488835518414,
        "green": {
            "coords": [
                53.264364122897675,
                -6.618567391680303
            ],
            "poi": {
                "front": {
                    "coords": [
                        53.26433560325847,
                        -6.618758597854804
                    ],
                    "distance": 0.10610161098418622
                },
                "middle": {
                    "coords": [
                        53.264364122897675,
                        -6.618567391680303
                    ],
                    "distance": 0
                },
                "back": {
                    "coords": [
                        53.2644043374791,
                        -6.618390285779156
                    ],
                    "distance": 0.13176206312358063
                }
            }
        }
    }
]

var coursesDb = [
  {
    name: "Anne's House",
    bounds: [
      [53.265712, -6.623949],
      [53.265687, -6.623533],
      [53.265226, -6.623643],
      [53.265257, -6.624059]
    ]
  },
  {
    name: "Joanne's House",
    bounds: [
      [53.265668, -6.623466],
      [53.265656, -6.622967],
      [53.265164, -6.623024],
      [53.265209, -6.623579]
    ],
    holes: [
    {
      id: 1,
      teebox: {
        mens: [53.265150, -6.616665],
        ladies: [53.264476, -6.616894]
      },
      green: {
        front: [53.265247, -6.623193],
        middle: [53.265238, -6.623142],
        back: [53.265233, -6.623085],
        bounds: []
      },
      bounds: [[53.265363, -6.623531], [53.265297, -6.623008], [53.265169, -6.623029], [53.265214, -6.623576]]
    },
    {
      id: 2,
      teebox: {
        mens: [],
        ladies: []
      },
      green: {
        front: [53.265664, -6.623270],
        middle: [53.265666, -6.623321],
        back: [53.265676, -6.623370],
        bounds: []
      },
      bounds: [[53.265724, -6.623410], [53.265690, -6.622959], [53.265602, -6.622973], [53.265635, -6.623397]]
    }]
  }
];

var golfCourse = coursesDb[1];

function getDistanceKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = toRad * (lat2-lat1);  // deg2rad below
  var dLon = toRad * (lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad * (lat1)) * Math.cos(toRad * (lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

btnTR.onactivate = function(evt) {
  if(config.currentHole == 1) {
    config.currentHole = 18;
  } else {
    config.currentHole = config.currentHole - 1;
  }
  
  vibration.start("bump");
  newUpdate();
}

btnBR.onactivate = function(evt) {
  if(config.currentHole == 18) {
    config.currentHole = 1;
  } else {
    config.currentHole = config.currentHole + 1;
  }
  
  vibration.start("bump");
  newUpdate();
}

var watchID = geolocation.watchPosition(
  (position) => {
    // Disable auto exit timeout after first GPS location obtained
    if(me.appTimeoutEnabled)
      me.appTimeoutEnabled = false;

    gpsPos = [position.coords.latitude, position.coords.longitude];
    
    if(gpsPos && !config.hasGPS) {
      config.hasGPS = true;
      vibration.start("nudge");
    } else if(!gpsPos && config.hasGPS) {
      config.hasGPS = false;
      vibration.start("nudge");
    }
    newUpdate();
    // refreshDistances();
  },
  (error) => {
    debugTime.text = 'gps error';
  },  
  {
    timeout: 60 * 1000
  });

var newUpdate = function() {
  
    courseTitle.text = "Killeen GC";
    holeNumber.text = config.currentHole;

    var iterHole = currentCourse[config.currentHole-1];
    var iterGreen = iterHole.green;

    if(iterGreen && iterGreen.poi && config.hasGPS) {
      try {
        var frontDist = kmConv[config['distanceUnit']] * getDistanceKm(gpsPos[0], gpsPos[1], iterGreen.poi.front.coords[0], iterGreen.poi.front.coords[1]);
        frontData.text = `${Math.round(frontDist)}`;
      }
      catch(err)
      {
        frontData.text = `err`;
      }

      try {
        var middleDist = kmConv[config['distanceUnit']] * getDistanceKm(gpsPos[0], gpsPos[1], iterGreen.poi.middle.coords[0], iterGreen.poi.middle.coords[1]);
        middleData.text = `${Math.round(middleDist)}`;
      }
      catch(err)
      {
        middleData.text = `err`;
      }
        
      try {
        var backDist = kmConv[config['distanceUnit']] * getDistanceKm(gpsPos[0], gpsPos[1], iterGreen.poi.back.coords[0], iterGreen.poi.back.coords[1]);
        backData.text = `${Math.round(backDist)}`;
      }
      catch(err)
      {
        backData.text = `err`;
      }
    }
    else
    {
      frontData.text = `?`;
      middleData.text = `?`;
      backData.text = `?`;
    }
}

var refreshDistances = function() {
  
  var currentHole = undefined;
  courseTitle.text = golfCourse.name;
  
  for(var i = 0; i < golfCourse.holes.length; i++) {
    var iterHole = golfCourse.holes[i];

    var isInside = inside(gpsPos, iterHole.bounds);
    if(isInside) {
      currentHole = iterHole;
      break;
    }
  }
  
  if(currentHole) {
    holeNumber.text = currentHole.id;
    
    var destination = [currentHole.green.back[0], currentHole.green.back[1]];

    var frontDist = kmConv[config['distanceUnit']] * getDistanceKm(gpsPos[0], gpsPos[1], currentHole.green.front[0], currentHole.green.front[1]);
    var middleDist = kmConv[config['distanceUnit']] * getDistanceKm(gpsPos[0], gpsPos[1], currentHole.green.middle[0], currentHole.green.middle[1]);
    var backDist = kmConv[config['distanceUnit']] * getDistanceKm(gpsPos[0], gpsPos[1], currentHole.green.back[0], currentHole.green.back[1]);

    frontData.text = `${Math.round(frontDist)}`;
    middleData.text = `${Math.round(middleDist)}`;
    backData.text = `${Math.round(backDist)}`;
  }
  else {
    frontData.text = `?`;
    middleData.text = `?`;
    backData.text = `?`;
    holeNumber.text = '?'
  }
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

const sensors = [];

