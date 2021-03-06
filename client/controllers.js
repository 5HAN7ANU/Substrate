angular.module('Substrate.controllers', ['ui.bootstrap'])
    .controller('HomeController', ['$scope', '$location', 'SEOService', 'CalendarService', 'Ads', 'FeaturedEvents', 'Users', '$http', 'Podcasts', 'MissionStatements', 'WeeklySchedule', 'Contact', function ($scope, $location, SEOService, CalendarService, Ads, FeaturedEvents, Users, $http, Podcasts, MissionStatements, WeeklySchedule, Contact) {
        // console.log('Home Controller');

        $scope.eventInterval = 8000;
        $scope.adInterval = 14000;
        $scope.eventSlides = [];
        $scope.adSlides = [];
        $scope.adSlides2 = [];

        //getting next 7 days of events 

        // var today = new Date();
        // var timeMin = today.toISOString();
        // var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        // var timeMax = nextWeek.toISOString();
        // console.log(timeMin);
        // console.log(timeMax);

        // CalendarService.getEvents(1000, timeMin, timeMax)
        //     .then(function (events) {
        //         var calendarArray = [];
        //         var calendarDay;
        //         var calendarMonth;
        //         for (i = 0; i < events.length; i++) {
        //             var eventDate = new Date(events[i].start.dateTime).getDate();
        //             var eventMonth = new Date(events[i].start.dateTime).getMonth();
        //             if (!calendarDay || !calendarMonth || eventDate != calendarDay || eventMonth != calendarMonth) { // new day
        //                 var eventArray = [];
        //                 var location = String(events[i].location);
        //                 var locationSplit = location.split(' ');
        //                 if (locationSplit[0] == "Iron") {
        //                     events[i].location = 'Iron City';
        //                 }
        //                 else if (locationSplit[0] == "The") {
        //                     events[i].location = 'The Nick';
        //                 }
        //                 else if (locationSplit[0] == "Saturn,") {
        //                     events[i].location = 'Saturn';
        //                 }
        //                 else {
        //                     events[i].location = '';
        //                 }
        //                 eventArray.push(events[i]);
        //                 calendarArray.push(eventArray);
        //                 calendarDay = eventDate;
        //                 calendarMonth = eventMonth;
        //             } else { // not a new day
        //                 var location = String(events[i].location);
        //                 var locationSplit = location.split(' ');
        //                 if (locationSplit[0] == "Iron") {
        //                     events[i].location = 'Iron City';
        //                 }
        //                 else if (locationSplit[0] == "The") {
        //                     events[i].location = 'The Nick';
        //                 }
        //                 else if (locationSplit[0] == "Saturn,") {
        //                     events[i].location = 'Saturn';
        //                 }
        //                 else {
        //                     events[i].location = '';
        //                 }
        //                 var eventArray = calendarArray[calendarArray.length - 1];
        //                 eventArray.push(events[i]);
        //             }
        //         }
        //         $scope.calendar = calendarArray;
        //         // console.log(calendarArray);
        //     });


        //Getting Ads ====================================
        $http({
            method: 'GET',
            url: '/api/ads/even'   // this might need to be before /ads
        }).then(function (success) {
            // console.log(success.data);
            $scope.adArray2 = success.data;
            // console.log('this is adArray2: ');
            // console.log($scope.adArray2);
            //setting up ad carousel 2==================
            for (i = 0; i < $scope.adArray2.length; i++) {
                var featuredAd2 = $scope.adArray2[i];
                // console.log('check it:')
                // console.log($scope.adArray2[i]);
                var adSlide2 = {
                    image: featuredAd2.imageurl,
                    link: featuredAd2.adLink
                };
                $scope.adSlides2.push(adSlide2);
            }
            // console.log($scope.adSlides2);
        }, function (err) {
            console.log(err);
        });


        $http({
            method: 'GET',
            url: '/api/ads/odd'   //gets ads with ids that are odd
        }).then(function (success) {
            // console.log(success.data);
            $scope.adArray = success.data;
            // console.log('this is adArray: ');
            // console.log($scope.adArray);
            //setting up ad carousel 1 ==================
            for (i = 0; i < $scope.adArray.length; i++) {
                var featuredAd = $scope.adArray[i];
                // console.log('check it:')
                // console.log($scope.adArray[i]);
                var adSlide = {
                    image: featuredAd.imageurl,
                    link: featuredAd.adLink
                };
                $scope.adSlides.push(adSlide);
            }
            // console.log($scope.adSlides);
        }, function (err) {
            console.log(err);
        });

        //----------------------------------------------

        //Getting Featured Events =========================
        $http({
            method: 'GET',
            url: '/api/featuredevents'
        }).then(function (success) {
            // console.log(success.data);
            $scope.featuredEventArray = success.data;
            // console.log('this is featuredEventArray: ');
            // console.log($scope.featuredEventArray);
            //setting up carousel ==================
            for (i = 0; i < $scope.featuredEventArray.length; i++) {
                var featuredEvent = $scope.featuredEventArray[i];
                // console.log('check it:');
                // console.log($scope.featuredEventArray[i]);
                var eventSlide = {
                    image: featuredEvent.imageurl
                };
                $scope.eventSlides.push(eventSlide);

            }
        }, function (err) {
            console.log(err);
        });

        //----------------------------------------------
        $scope.djList = Users.getDj();
        // console.log($scope.dj);

        $scope.podcasts = Podcasts.query();
        // console.log($scope.podcasts);

        $scope.ads = Ads.query();
        // console.log($scope.ads);

        $scope.featuredEvents = FeaturedEvents.query();
        // console.log($scope.featuredEvents);

        //+++++++++++++++++++++++++++++++++++++++++++++++++
        //Getting Mission Statement

        $http({
            method: 'GET',
            url: '/api/mission'
        }).then(function (success) {
            $scope.missionStatement = success.data[0].statement;
        }, function (err) {
            console.log(err);
        });

        //+++++++++++++++++++++++++++++++++++++++++++++++++
        //Getting Weekly Schedule

        $http({
            method: 'GET',
            url: '/api/weeklyschedule'
        }).then(function (success) {
            $scope.week = success.data;
            $scope.sunday = $scope.week[0];
            $scope.monday = $scope.week[1];
            $scope.tuesday = $scope.week[2];
            $scope.wednesday = $scope.week[3];
            $scope.thursday = $scope.week[4];
            $scope.friday = $scope.week[5];
            $scope.saturday = $scope.week[6];
        }, function (err) {
            console.log(err);
        });

        SEOService.setSEO({
            title: 'Substrate Radio | Home',
            description: 'Welcome to Substrate Radio',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
        // $scope.sendMessage = function () {
        //     console.log('inside contact controller');
        //     var contactInfo = {
        //         fromEmail: $scope.fromEmail,
        //         subject: $scope.subject,
        //         content: $scope.content
        //     }
        //     var contact = new Contact(contactInfo);
        //     contact.$save(function () {
        //         console.log('Email send ok');
        //         location.reload();
        //     }, function (err) {
        //         console.log(err);
        //     });
        // }

        var calendar = $('#calendar').fullCalendar({
            googleCalendarApiKey: 'AIzaSyBrPUrmwURMRhIomOTXShkeBOSmoLP80Gw',
            events: {
                googleCalendarId: 'substrateradio@gmail.com'
            },
                eventRender: function (event, element) {
                    if (event.location == 'Iron City - Shows, 513 22nd Street S, Birmingham, AL, 35233') {
                        event.location = '@ Iron City';
                    } else if (event.location == 'Saturn, 200 41st Street S, Birmingham, AL, 35222') {
                        event.location = '@ Saturn';
                    } else if (event.location == 'The Nick, 2514 10th Ave S, Birmingham, AL, 35205') {
                        event.location = '@ The Nick';
                    } else {
                        event.location = '';
                    }

                    var time = String(event.start);
                    var timeArray = [];
                    for (var i = 0; i < time.length; i++) {
                        timeArray.push(time[i]);
                    }
                    // console.log(timeArray); 
                    var x = timeArray[16] + timeArray[17];
                    if (x == 00) {
                        time = '12AM ';
                    } else if (x == 01) {
                        time = '1AM ';
                    } else if (x == 02) {
                        time = '2AM ';
                    } else if (x == 03) {
                        time = '3AM ';
                    } else if (x == 04) {
                        time = '4AM ';
                    } else if (x == 05) {
                        time = '5AM ';
                    } else if (x == 06) {
                        time = '6AM ';
                    } else if (x == 07) {
                        time = '7AM ';
                    } else if (x == 08) {
                        time = '8AM ';
                    } else if (x == 09) {
                        time = '9AM ';
                    } else if (x == 10) {
                        time = '10AM ';
                    } else if (x == 11) {
                        time = '11AM ';
                    } else if (x == 12) {
                        time = '12PM ';
                    } else if (x == 13) {
                        time = '1PM ';
                    } else if (x == 14) {
                        time = '2PM ';
                    } else if (x == 15) {
                        time = '3PM ';
                    } else if (x == 16) {
                        time = '4PM ';
                    } else if (x == 17) {
                        time = '5PM ';
                    } else if (x == 18) {
                        time = '6PM ';
                    } else if (x == 19) {
                        time = '7PM ';
                    } else if (x == 20) {
                        time = '8PM ';
                    } else if (x == 21) {
                        time = '9PM ';
                    } else if (x == 22) {
                        time = '10PM ';
                    } else if (x == 23) {
                        time = '11PM ';
                    }
                    element.find('.fc-list-item-title').append("<br/><div id='eventLocationLine'>" + time + event.location + "</div>");
                },
                eventClick: function (event) {
                    if (event.url) {
                        return false;
                    }
                },
            defaultView: 'listWeek',
            height: 575,
            width: 300
        });

        var allEvents = $('#calendar').fullCalendar('clientEvents');
        console.log(allEvents);
    }])
    .controller('CalendarController', ['$scope', '$location', 'SEOService', 'CalendarService', function ($scope, $location, SEOService, CalendarService) {

        $(document).ready(function () {

            // page is now ready, initialize the calendar...

            $('#calendar').fullCalendar({
                googleCalendarApiKey: 'AIzaSyBrPUrmwURMRhIomOTXShkeBOSmoLP80Gw',
                events: {
                    googleCalendarId: 'substrateradio@gmail.com'
                },
                eventRender: function (event, element) {
                    if (event.location == 'Iron City - Shows, 513 22nd Street S, Birmingham, AL, 35233') {
                        event.location = '@ Iron City';
                    } else if (event.location == 'Saturn, 200 41st Street S, Birmingham, AL, 35222') {
                        event.location = '@ Saturn';
                    } else if (event.location == 'The Nick, 2514 10th Ave S, Birmingham, AL, 35205') {
                        event.location = '@ The Nick';
                    } else {
                        event.location = '';
                    }

                    var time = String(event.start);
                    var timeArray = [];
                    for (var i = 0; i < time.length; i++) {
                        timeArray.push(time[i]);
                    }
                    // console.log(timeArray); 
                    var x = timeArray[16] + timeArray[17];
                    if (x == 00) {
                        time = '12AM ';
                    } else if (x == 01) {
                        time = '1AM ';
                    } else if (x == 02) {
                        time = '2AM ';
                    } else if (x == 03) {
                        time = '3AM ';
                    } else if (x == 04) {
                        time = '4AM ';
                    } else if (x == 05) {
                        time = '5AM ';
                    } else if (x == 06) {
                        time = '6AM ';
                    } else if (x == 07) {
                        time = '7AM ';
                    } else if (x == 08) {
                        time = '8AM ';
                    } else if (x == 09) {
                        time = '9AM ';
                    } else if (x == 10) {
                        time = '10AM ';
                    } else if (x == 11) {
                        time = '11AM ';
                    } else if (x == 12) {
                        time = '12PM ';
                    } else if (x == 13) {
                        time = '1PM ';
                    } else if (x == 14) {
                        time = '2PM ';
                    } else if (x == 15) {
                        time = '3PM ';
                    } else if (x == 16) {
                        time = '4PM ';
                    } else if (x == 17) {
                        time = '5PM ';
                    } else if (x == 18) {
                        time = '6PM ';
                    } else if (x == 19) {
                        time = '7PM ';
                    } else if (x == 20) {
                        time = '8PM ';
                    } else if (x == 21) {
                        time = '9PM ';
                    } else if (x == 22) {
                        time = '10PM ';
                    } else if (x == 23) {
                        time = '11PM ';
                    }
                    element.find('.fc-title').append("<br/><div id='eventLocationLine'>" + time + event.location + "</div>");
                },
                eventClick: function (event) {
                    if (event.url) {
                        return false;
                    }
                }
            })

        });

        // var d = new Date();
        // var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        // var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);

        // var timeMin = firstDay.toISOString();
        // var timeMax = lastDay.toISOString();

        // console.log(timeMin);
        // console.log(timeMax);

        // CalendarService.getEvents(1000, timeMin, timeMax)
        //     .then(function(events) {
        //         var calendarArray = [];
        //         var calendarDay;
        //         var calendarMonth;
        //         for (i = 0; i < events.length; i++) {
        //             var eventDate = new Date(events[i].start.dateTime).getDate();
        //             var eventMonth = new Date(events[i].start.dateTime).getMonth();
        //             if (!calendarDay || !calendarMonth || eventDate != calendarDay || eventMonth != calendarMonth) { // new day
        //                 var eventArray = [];
        //                 var location = String(events[i].location);
        //                 var locationSplit = location.split(' ');
        //                 if (locationSplit[0] == "Iron") {
        //                     events[i].location = '@ Iron City';
        //                 }
        //                 else if (locationSplit[0] == "The") {
        //                     events[i].location = '@ The Nick';
        //                 }
        //                 else if (locationSplit[0] == "Saturn,") {
        //                     events[i].location = '@ Saturn';
        //                 }
        //                 else {
        //                     events[i].location = 'Substrate Radio';
        //                 }
        //                 console.log(events[i].location);
        //                 eventArray.push(events[i]);
        //                 calendarArray.push(eventArray);
        //                 calendarDay = eventDate;
        //                 calendarMonth = eventMonth;
        //             } else { // not a new day
        //                 var location = String(events[i].location);
        //                 var locationSplit = location.split(' ');
        //                 if (locationSplit[0] == "Iron") {
        //                     events[i].location = '@ Iron City';
        //                 }
        //                 else if (locationSplit[0] == "The") {
        //                     events[i].location = '@ The Nick';
        //                 }
        //                 else if (locationSplit[0] == "Saturn,") {
        //                     events[i].location = '@ Saturn';
        //                 }
        //                 else {
        //                     events[i].location = 'Substrate Radio';
        //                 }
        //                 console.log(events[i].location);
        //                 var eventArray = calendarArray[calendarArray.length - 1];
        //                 eventArray.push(events[i]);
        //             }
        //         }
        //         $scope.calendar = calendarArray;
        //     });

        // var d = new Date();
        // var month = new Array();
        // month[0] = "January";
        // month[1] = "February";
        // month[2] = "March";
        // month[3] = "April";
        // month[4] = "May";
        // month[5] = "June";
        // month[6] = "July";
        // month[7] = "August";
        // month[8] = "September";
        // month[9] = "October";
        // month[10] = "November";
        // month[11] = "December";
        // var n = month[d.getMonth()];
        // $scope.monthOfTheYear = n;


        SEOService.setSEO({
            title: 'Substrate Radio | Events',
            description: 'Substrate Radio endorsed events',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('MagazineController', ['$scope', '$location', 'SEOService', 'Posts', 'Users', 'UserService', '$route', function ($scope, $location, SEOService, Posts, Users, UserService, $route) {
        console.log('Magazine Controller');

        UserService.isLoggedIn();
        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;
        });
        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        function getPosts() {
            $scope.posts = Posts.query();
            console.log($scope.posts)
        }
        getPosts();

        SEOService.setSEO({
            title: 'Substrate Radio | Magazine',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ArticleController', ['$scope', '$routeParams', 'Posts', 'Users', 'UserService', '$location', 'SEOService', function ($scope, $routeParams, Posts, Users, UserService, $location, SEOService) {
        console.log('Article Controller');

        // UserService.isLoggedIn();
        // $scope.loggedIn = false;
        // UserService.me().then(function(me){
        //     $scope.ME = me;
        //     $scope.loggedIn = true;
        // })
        // $scope.logout = function () {
        //     UserService.logout().then(function(){
        //     $route.reload();
        //     });
        // }

        var singleId = $routeParams.id;
        console.log(singleId);
        $scope.post = Posts.get({ id: singleId });

        // console.log($scope.post);

        $scope.goToUpdate = function () {
            $location.path('magazine/' + singleId + '/update');
        }


        // $scope.goHome = function() {
        //     $location.path('/posts');
        // }

        // }])

        SEOService.setSEO({
            title: 'Substrate Radio | Magazine',
            description: 'Articles from our Substrate Radio contributors',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('AboutController', ['$scope', '$location', 'SEOService', 'Users', function ($scope, $location, SEOService, Users) {
        console.log('About Controller');

        $scope.dj = Users.getDj();
        console.log($scope.dj);


        SEOService.setSEO({
            title: 'Substrate Radio | About Us',
            description: 'Get to know Substrate Radio',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ComposeAdController', ['$scope', '$location', 'Ads', 'UserService', 'SEOService', function ($scope, $location, Ads, UserService, SEOService) {
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $scope.logout = function () {
            UserService.logout()
            $location.path('/');
        }

        $scope.submitFeaturedAd = function () {
            var data = {
                adName: $scope.adName,
                adLink: $scope.adLink,
                imageurl: $scope.imageurl,
                publish: 0
            }

            var featuredAdToPost = new Ads(data);
            featuredAdToPost.$save(function (success) {
                console.log('Ad submitted successfully');
                $location.path('/admin');
            });
        }

        $scope.goBack = function () {
            $location.path('/admin');
        }

        SEOService.setSEO({
            title: 'Substrate Radio | Compose Featured Event',
            description: 'Compose a featured event',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ComposeFeaturedEventController', ['$scope', '$location', 'FeaturedEvents', 'UserService', 'SEOService', function ($scope, $location, FeaturedEvents, UserService, SEOService) {
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $scope.logout = function () {
            UserService.logout()
            $location.path('/');
        }

        $scope.submitFeaturedEvent = function () {
            var data = {
                eventName: $scope.eventName,
                eventDate: $scope.eventDate,
                eventDescription: $scope.eventDescription,
                imageurl: $scope.imageurl,
                publish: 0
            }

            var featuredEventToPost = new FeaturedEvents(data);
            featuredEventToPost.$save(function (success) {
                console.log('Featured event submitted successfully');
                $location.path('/admin');
            });
        }

        $scope.goBack = function () {
            $location.path('/admin');
        }

        SEOService.setSEO({
            title: 'Substrate Radio | Compose Featured Event',
            description: 'Compose a featured event',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ComposeController', ['$scope', '$location', 'UserService', 'SEOService', 'Posts', function ($scope, $location, UserService, SEOService, Posts) {
        console.log('Compose Controller');

        UserService.requireLogin();
        UserService.isLoggedIn();

        UserService.me().then(function (me) {
            $scope.ME = me;
        })

        $scope.logout = function () {
            UserService.logout()
            $location.path('/posts');
        }
        $scope.submitArticle = function () {
            UserService.me().then(function (me) {

                var data = {
                    title: $scope.post.title,
                    userid: me.id,
                    categoryid: $scope.post.categoryid,
                    content: $scope.post.content,
                    imageurl: $scope.post.imageurl
                }

                var articleToPost = new Posts(data);
                articleToPost.$save(function (success) {
                    console.log('Article submitted successfully')
                    $location.path('/userprofile');
                });

            });

        }
        $scope.goBack = function () {
            $location.path('/userprofile');
        }
        SEOService.setSEO({
            title: 'Substrate Radio | Compose',
            description: 'Compose an article for Substrate Magazine',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('EditAdController', ['$scope', 'UserService', 'Ads', '$routeParams', '$location', '$http', function ($scope, UserService, Ads, $routeParams, $location, $http) {
        UserService.requireLogin();
        UserService.requiresAdmin();
        UserService.isLoggedIn();

        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        var id = $routeParams.id;
        $scope.featuredAd = Ads.get({ id: id }, function () {
            console.log("this ad's publish value = " + $scope.featuredAd.publish);
            $scope.featuredAd.publish = String($scope.featuredAd.publish);
            console.log('1 = publish / 0 = not publish');
            $scope.publish = $scope.featuredAd.publish;
            $scope.imageurl = $scope.featuredAd.imageurl;
            $scope.previewFeaturedAd = $scope.featuredAd;
            $scope.adId = $scope.featuredAd.id;
        });

        $scope.publishValues = [
            { name: 'No', value: '0' },
            { name: 'Yes', value: '1' }
        ];


        $scope.update = function () {
            $scope.featuredAd.$update(function (success) {
                $location.path('/admin');
            });
        }

        $scope.promptDelete = function () {
            var shouldDelete = confirm('Are you sure you want to delete this Ad?');
            if (shouldDelete) {
                $scope.featuredAd.$delete(function (success) {
                    $location.path('/admin');
                });
            }
        }

        $scope.cancelupdate = function () {
            $location.path('/admin');
        }
    }])
    .controller('EditFeaturedEventController', ['$scope', 'UserService', 'FeaturedEvents', '$routeParams', '$location', '$http', function ($scope, UserService, FeaturedEvents, $routeParams, $location, $http) {
        UserService.requireLogin();
        UserService.requiresAdmin();
        UserService.isLoggedIn();

        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        var id = $routeParams.id;
        $scope.featuredEvent = FeaturedEvents.get({ id: id }, function () {
            console.log("this event's publish value = " + $scope.featuredEvent.publish);
            $scope.featuredEvent.publish = String($scope.featuredEvent.publish);
            console.log('1 = publish / 0 = not publish');
            $scope.publish = $scope.featuredEvent.publish;
            $scope.imageurl = $scope.featuredEvent.imageurl;
            $scope.previewFeaturedEvent = $scope.featuredEvent;
        });

        $scope.publishValues = [
            { name: 'No', value: '0' },
            { name: 'Yes', value: '1' }
        ];


        $scope.update = function () {
            $scope.featuredEvent.$update(function (success) {
                $location.path('/admin');
            });
        }

        $scope.promptDelete = function () {
            var shouldDelete = confirm('Are you sure you want to delete this featured event?');
            if (shouldDelete) {
                $scope.featuredEvent.$delete(function (success) {
                    $location.path('/admin');
                });
            }
        }

        $scope.cancelupdate = function () {
            $location.path('/admin');
        }
    }])
    .controller('EditArticleController', ['$scope', 'UserService', 'Posts', '$routeParams', '$location', '$http', function ($scope, UserService, Posts, $routeParams, $location, $http) {
        UserService.requireLogin();
        UserService.requiresAdmin();
        UserService.isLoggedIn();

        $scope.loggedIn = false;
        $scope.ifAdmin = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;
            if (me.role === 'admin') {
                $scope.ifAdmin = true;
            }
        });
        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        var id = $routeParams.id;
        $scope.post = Posts.get({ id: id }, function () {
            console.log("this article's publish value = " + $scope.post.publish);
            $scope.post.publish = String($scope.post.publish);
            console.log('1 = publish / 0 = not publish');
            $scope.publish = $scope.post.publish;
            $scope.imageurl = $scope.post.imageurl;
            $scope.previewPost = $scope.post;
        });

        $scope.publishValues = [
            { name: 'No', value: '0' },
            { name: 'Yes', value: '1' }
        ];


        $scope.update = function () {
            $scope.post.$update(function (success) {
                $location.path('/admin');
            });
        }

        $scope.promptDelete = function () {
            var shouldDelete = confirm('Are you sure you want to delete this entry?');
            if (shouldDelete) {
                $scope.post.$delete(function (success) {
                    $location.path('/admin');
                });
            }
        }

        $scope.cancelupdate = function () {
            $location.path('/admin');
        }
    }])
    .controller('AdminController', ['$route', 'Ads', 'FeaturedEvents', '$scope', '$location', 'UserService', 'SEOService', 'Users', 'Posts', '$http', 'MissionStatements', 'WeeklySchedule', function ($route, Ads, FeaturedEvents, $scope, $location, UserService, SEOService, Users, Posts, $http, MissionStatements, WeeklySchedule) {
        console.log('Admin Controller');
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $('#missionStatementsDiv').hide();
        $('#magazineDiv').hide();
        $('#usersDiv').hide();
        $('#featuredEventsDiv').hide();
        $('#adsDiv').hide();
        $('#weeklyScheduleDiv').hide();

        UserService.isLoggedIn();
        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;
        });
        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        $scope.composeFeaturedEventPage = function () {
            $location.path('/composefeaturedevent');
        };

        $scope.composeAdPage = function () {
            $location.path('/composead');
        };

        $scope.composeMissionStatementPage = function () {
            $location.path('/composeMissionStatement');
        };

        $scope.goBack = function () {
            $route.reload();
        }

        $scope.showWeeklyScheduleDetails = function () {
            $('#weeklyScheduleDiv').show();
            $('#missionStatementsDiv').hide();
            $('#magazineDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').hide();
            $('#usersDiv').hide();
            $('#publishedMissionStatementsDiv').hide();
            $('#unpublishedMissionStatementsDiv').hide();
        }

        $scope.showMissionStatementDetails = function () {
            $('#missionStatementsDiv').show();
            $('#magazineDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').hide();
            $('#usersDiv').hide();
            $('#publishedMissionStatementsDiv').hide();
            $('#unpublishedMissionStatementsDiv').hide();
            $('#weeklyScheduleDiv').hide();
        }

        $scope.showPublishedMissionStatements = function () {
            $('#publishedMissionStatementsDiv').show();
            $('#unpublishedMissionStatementsDiv').hide();
        }

        $scope.showUnpublishedMissionStatements = function () {
            $('#publishedMissionStatementsDiv').hide();
            $('#unpublishedMissionStatementsDiv').show();
        }

        $scope.showUserDetails = function () {
            $('#missionStatementsDiv').hide();
            $('#magazineDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').hide();
            $('#usersDiv').show();
            $('#weeklyScheduleDiv').hide();
        };

        $scope.showPostDetails = function () {
            $('#magazineDiv').show();
            $('#missionStatementsDiv').hide();
            $('#usersDiv').hide();
            $('#unpublishedPostsDiv').hide();
            $('#publishedPostsDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').hide();
            $('#weeklyScheduleDiv').hide();
        }

        $scope.showPublishedPosts = function () {
            $('#publishedPostsDiv').show();
            $('#unpublishedPostsDiv').hide();

        }

        $scope.showUnpublishedPosts = function () {
            $('#publishedPostsDiv').hide();
            $('#unpublishedPostsDiv').show();

        }

        $scope.showFeaturedEventDetails = function () {
            $('#missionStatementsDiv').hide();
            $('#magazineDiv').hide();
            $('#usersDiv').hide();
            $('#unpublishedPostsDiv').hide();
            $('#publishedPostsDiv').hide();
            $('#featuredEventsDiv').show();
            $('#publishedEventsDiv').hide();
            $('#unpublishedEventsDiv').hide();
            $('#adsDiv').hide();
            $('#weeklyScheduleDiv').hide();
        }

        $scope.showPublishedEvents = function () {
            $('#publishedEventsDiv').show();
            $('#unpublishedEventsDiv').hide();

        }

        $scope.showUnpublishedEvents = function () {
            $('#publishedEventsDiv').hide();
            $('#unpublishedEventsDiv').show();

        }

        $scope.showAdDetails = function () {
            $('#missionStatementsDiv').hide();
            $('#magazineDiv').hide();
            $('#usersDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').show();
            $('#publishedAdsDiv').hide();
            $('#unpublishedAdsDiv').hide();
            $('#weeklyScheduleDiv').hide();
        }

        $scope.showPublishedAds = function () {
            $('#publishedAdsDiv').show();
            $('#unpublishedAdsDiv').hide();

        }

        $scope.showUnpublishedAds = function () {
            $('#publishedAdsDiv').hide();
            $('#unpublishedAdsDiv').show();

        }

        //----------*******Mission Statements List********-----------------
        $scope.publishedMissionStatements = MissionStatements.query();
        $http({
            method: 'GET',
            url: '/api/mission/unpublished'
        }).then(function (success) {
            console.log('getting unpublished mission statements');
            $scope.unpublishedMissionStatements = success.data;
            console.log($scope.unpublishedMissionStatements);
        }, function (err) {
            console.log(err);
        });

        //----------*******Post List********-----------------
        $scope.publishedPosts = Posts.query();
        $http({
            method: 'GET',
            url: '/api/posts/unpublished'
        }).then(function (success) {
            $scope.unpublishedPosts = success.data;
            console.log($scope.unpublishedPosts);
        }, function (err) {
            console.log(err);
        });

        //----------*******Ads List********-----------------

        $scope.publishedAds = Ads.query();
        $http({
            method: 'GET',
            url: '/api/ads/unpublished'
        }).then(function (success) {
            $scope.unpublishedAds = success.data;
            console.log($scope.unpublishedAds);
        }, function (err) {
            console.log(err);
        });

        //----------*******Featured Events List********-----------------

        $scope.publishedEvents = FeaturedEvents.query();
        console.log($scope.publishedEvents);
        $http({
            method: 'GET',
            url: '/api/featuredevents/unpublished'
        }).then(function (success) {
            $scope.unpublishedEvents = success.data;
            console.log($scope.unpublishedEvents);
        }, function (err) {
            console.log(err);
        });

        //----------*******User List********-----------------
        $scope.users = Users.query();
        console.log('controllers.js/UserListController: users acquired')
        console.log($scope.users);

        $scope.deleteUser = function (user) {
            console.log('controllers.js/UserListController: The user to be deleted is: ');
            console.log(user);
            var shouldDelete = confirm('Are you sure you want to delete this user?');
            console.log(shouldDelete);
            if (shouldDelete) {
                console.log('user clicked OK');
                user.$delete(function () {
                    console.log('User Deleted!');
                    console.log(user);
                    $scope.users = Users.query();
                });
            }
        }

        //+++++++++++++++++++++++++++++++++++++++++++++++++
        //Getting Weekday Schedule

        $scope.sunday = WeeklySchedule.get({ weekday: 1 });
        $scope.monday = WeeklySchedule.get({ weekday: 2 });
        $scope.tuesday = WeeklySchedule.get({ weekday: 3 });
        $scope.wednesday = WeeklySchedule.get({ weekday: 4 });
        $scope.thursday = WeeklySchedule.get({ weekday: 5 });
        $scope.friday = WeeklySchedule.get({ weekday: 6 });
        $scope.saturday = WeeklySchedule.get({ weekday: 7 });

        $scope.updateWeeklySchedule = function () {
            $scope.sunday.$update(function (success) {
                console.log('Sunday schedule updated!');
            });

            $scope.monday.$update(function (success) {
                console.log('Monday schedule updated!');
            });

            $scope.tuesday.$update(function (success) {
                console.log('Tuesday schedule updated!');
            });

            $scope.wednesday.$update(function (success) {
                console.log('Wednesday schedule updated!');
            });

            $scope.thursday.$update(function (success) {
                console.log('Thursday schedule updated!');
            });

            $scope.friday.$update(function (success) {
                console.log('Friday schedule updated!');
            });

            $scope.saturday.$update(function (success) {
                console.log('Saturday schedule updated!');
                location.pathname = '/admin';
            });
        };

        SEOService.setSEO({
            title: 'Substrate Radio | Admin',
            description: 'Do your thing boss-man',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    // .controller('ContactController', ['$scope', 'Contact', '$location', function ($scope, Contact, $location) {
    //     console.log("ContactController");
    //     $scope.sendMessage = function () {
    //         console.log('inside contact controller');
    //         var contactInfo = {
    //             fromEmail: $scope.fromEmail,
    //             subject: $scope.subject,
    //             content: $scope.content
    //         }
    //         var contact = new Contact(contactInfo);
    //         contact.$save(function () {
    //             console.log('Email send ok');
    //             $location.path('/');
    //         }, function (err) {
    //             console.log(err);
    //         });
    //     }
    // }])
    .controller('LoginController', ['$scope', '$location', 'UserService', 'SEOService', function ($scope, $location, UserService, SEOService) {
        console.log("Login Controller");
        UserService.me().then(function (me) {
            redirect();
        });
        // SEOService.setSEO({
        //     title: 'Login',
        //     description: 'Login'
        // });
        $scope.login = function (user) {
            UserService.login($scope.email, $scope.password)
                .then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                    $scope.error = err.data.message;
                });
        }

        function redirect() {
            var dest = $location.search().p;
            if (!dest) {
                dest = '/userprofile';
            }
            $location.path(dest).search('p', null).replace();
        }

    }])
    .controller('UserProfileController', ['$scope', 'Posts', 'UserService', 'Users', '$location', '$http', function ($scope, Posts, UserService, Users, $location, $http) {
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;

        });

        $scope.amAdmin = false;
        if (UserService.isAdmin()) {
            $scope.amAdmin = true;
        }

        $scope.logout = function () {
            UserService.logout().then(function () {
                $location.path('/magazine');
            });
        }

        function getUsers() {
            $scope.users = Users.query();
            console.log($scope.users);
        }
        getUsers();

        UserService.me().then(function (me) {  // TO GET POSTS BY LOGGED IN USER
            var ME = me;
            var myUserId = ME.id;
            console.log("this is my user id: " + myUserId);
            $http({
                method: 'GET',
                url: '/api/posts/user/' + myUserId
            }).then(function (success) {
                $scope.myPosts = success.data;
                console.log($scope.myPosts);
            }, function (err) {
                console.log(err);
            });
        })
    }])
    .controller('CreateUserController', ['$scope', 'Users', 'UserService', '$location', function ($scope, Users, UserService, $location) {
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $scope.create = function () {
            var data = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                role: $scope.role,
                dj: $scope.dj,
                imageurl: $scope.imageurl,
                bio: $scope.bio
            }

            var u = new Users(data);
            u.$save(function () {
                $location.path('/admin');
            });
        };

        // $scope.loggedInUser = 'The logged in user is: ' + UserService.user.firstname + ' ' + UserService.user.lastname + ', who is a ' + UserService.user.role;

        $scope.roles = [
            { name: 'User', value: 'user' },
            { name: 'Admin', value: 'admin' }
        ];

        $scope.djValues = [
            { name: 'No', value: 0 },
            { name: 'Yes', value: 1 }
        ];

        $scope.role = $scope.roles[0].value;
        $scope.dj = $scope.djValues[0].value;
    }])
    .controller('UpdateUserController', ['$scope', '$routeParams', 'Users', 'UserService', function ($scope, $routeParams, Users, UserService) {
        console.log('controllers.js/UpdateUserController: Entered the UpdateUserController');

        UserService.requireLogin();
        UserService.isLoggedIn();
        $scope.loggedIn = false;
        UserService.me().then(function (me) {
            $scope.ME = me;
            $scope.loggedIn = true;
        });
        UserService.isAdmin();

        var userId = $routeParams.id;

        // $scope.featuredUser = Users.get({ id: userId }, function () {
        //     console.log('The user is: ' + $scope.featuredUser.firstname);
        //     $scope.featuredUser.role = String($scope.featuredUser.role);
        //     $scope.featuredUser.dj = String($scope.featuredUser.dj);
        //     $scope.id = $scope.featuredUser.id;
        //     $scope.firstname = $scope.featuredUser.firstname;
        //     $scope.lastname = $scope.featuredUser.lastname;
        //     $scope.email = $scope.featuredUser.email;
        //     $scope.password = $scope.featuredUser.password;
        //     $scope.role = $scope.featuredUser.role;
        //     $scope.dj = $scope.featuredUser.dj;
        //     $scope.imageurl = $scope.featuredUser.imageurl;
        //     $scope.bio = $scope.featuredUser.bio;

        //     console.log('Controllers.js/UpdateUserController: The user is ');
        //     console.log($scope.featuredUser);

        //     console.log('Controllers.js/UpdateUserController: $scope.featuredUser.dj ' + $scope.featuredUser.dj);

        //     console.log('Controllers.js/UpdateUserController: $scope.dj = ' + $scope.dj);
        // });

        $scope.featuredUser = Users.get({ id: userId }, function () {
            $scope.featuredUser.dj = String($scope.featuredUser.dj);
        });

        $scope.updateUser = function () {
            // console.log('Controllers.js/UpdateUserController: entered the updateUser function');

            // $scope.featuredUser.id = $scope.id;
            // $scope.featuredUser.firstname = $scope.firstname;
            // $scope.featuredUser.lastname = $scope.lastname;
            // $scope.featuredUser.email = $scope.email;
            // $scope.featuredUser.password = $scope.password;
            // $scope.featuredUser.role = $scope.role;
            // $scope.featuredUser.dj = $scope.dj;
            // $scope.featuredUser.imageurl = $scope.imageurl;
            // $scope.featuredUser.bio = $scope.bio;

            // console.log('Controllers.js/UpdateUserController: $scope.featuredUser.name' + $scope.featuredUser.firstname + ' ' + $scope.featuredUser.lastname);

            // console.log('Controllers.js/UpdateUserController: $scope.featuredUser.email ' + $scope.featuredUser.email);

            // console.log('Controllers.js/UpdateUserController: $scope.featuredUser.role ' + $scope.featuredUser.role);

            $scope.featuredUser.$update(function (success) {
                console.log('controllers.js/UpdateUserController: The user was updated!');
                location.pathname = '/admin';
            });
        };

        $scope.roles = [
            { name: 'User', value: 'user' },
            { name: 'Admin', value: 'admin' }
        ];

        $scope.djValues = [
            { name: 'No', value: 0 },
            { name: 'Yes', value: 1 }
        ];

        $scope.logoutPage = function () {
            UserService.logout().then(function () {
                console.log('logged out!');
                $location.path('/login');
            });
            alert('You have been logged out!');
        };
    }])
    .controller('PodcastController', ['$scope', 'Pods', function ($scope, Pods) {
        console.log('PodController');

        $scope.podcastList = Pods.query();
    }])
    //ComposeMissionStatementController
    .controller('ComposeMissionStatementController', ['$scope', '$location', 'MissionStatements', 'UserService', 'SEOService', function ($scope, $location, MissionStatements, UserService, SEOService) {
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $scope.logout = function () {
            UserService.logout()
            $location.path('/');
        }

        $scope.submitMissionStatement = function () {
            var data = {
                statement: $scope.missionStatement,
                publish: 0
            }

            var featuredMissionStatementToPost = new MissionStatements(data);
            featuredMissionStatementToPost.$save(function (success) {
                console.log('Mission statement submitted successfully');
                $location.path('/admin');
            });
        }

        $scope.goBack = function () {
            $location.path('/admin');
        }

        SEOService.setSEO({
            title: 'Substrate Radio | Compose Mission Statement',
            description: 'Compose a Mission Statement',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    //EditMissionStatementController
    .controller('EditMissionStatementController', ['$scope', 'UserService', 'MissionStatements', '$routeParams', '$location', '$http', function ($scope, UserService, MissionStatements, $routeParams, $location, $http) {
        UserService.requireLogin();
        UserService.requiresAdmin();
        UserService.isLoggedIn();

        console.log('controller.js/EditMissionStatementController: Inside Edit Mission Statement Controller');

        $scope.logout = function () {
            UserService.logout().then(function () {
                $route.reload();
            });
        }

        var id = $routeParams.id;
        $scope.featuredMissionStatement = MissionStatements.get({ id: id }, function () {
            $scope.featuredMissionStatement.publish = String($scope.featuredMissionStatement.publish);
            // $scope.publish = $scope.featuredMissionStatement.publish;
        });

        $scope.publishValues = [
            { name: 'No', value: '0' },
            { name: 'Yes', value: '1' }
        ];

        $scope.update = function () {
            $scope.featuredMissionStatement.$update(function (success) {
                $location.path('/admin');
            });
        }

        $scope.promptDelete = function () {
            var shouldDelete = confirm('Are you sure you want to delete this mission statement?');
            if (shouldDelete) {
                $scope.featuredMissionStatement.$delete(function (success) {
                    $location.path('/admin');
                });
            }
        }

        $scope.cancelupdate = function () {
            $location.path('/admin');
        }



    }])



    .controller('EmailController', ['$scope', '$location', 'SEOService', '$http', 'Contact', function ($scope, $location, SEOService, $http, Contact) {
        console.log('email Controller');


        $scope.sendMessage = function () {
            console.log('inside contact controller');
            var contactInfo = {
                fromEmail: $scope.fromEmail,
                subject: $scope.subject,
                content: $scope.content
            }
            var contact = new Contact(contactInfo);
            contact.$save(function () {
                console.log('Email send ok');
                $location.path('/');
            }, function (err) {
                console.log(err);
            });
        }
    }])