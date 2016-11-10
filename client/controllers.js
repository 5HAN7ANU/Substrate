angular.module('Substrate.controllers', ['ui.bootstrap'])
    .controller('HomeController', ['$scope', '$location', 'SEOService', 'CalendarService', 'Ads', 'FeaturedEvents', 'Users', '$http', 'Podcasts', 'MissionStatements', function ($scope, $location, SEOService, CalendarService, Ads, FeaturedEvents, Users, $http, Podcasts, MissionStatements) {
        console.log('Home Controller');
        $scope.eventInterval = 8000;
        $scope.adInterval = 14000;
        $scope.eventSlides = [];
        $scope.adSlides = [];
        $scope.adSlides2 = [];

        //getting next 7 days of events 

        var today = new Date();
        var timeMin = today.toISOString();
        var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        var timeMax = nextWeek.toISOString();
        console.log(timeMin);
        console.log(timeMax);

        CalendarService.getEvents(1000, timeMin, timeMax)
            .then(function (events) {
                var calendarArray = [];
                var calendarDay;
                var calendarMonth;
                for (i = 0; i < events.length; i++) {
                    var eventDate = new Date(events[i].start.dateTime).getDate();
                    var eventMonth = new Date(events[i].start.dateTime).getMonth();
                    if (!calendarDay || !calendarMonth || eventDate != calendarDay || eventMonth != calendarMonth) { // new day
                        var eventArray = [];
                        var location = String(events[i].location);
                        var locationSplit = location.split(' ');
                        if (locationSplit[0] == "Iron") {
                            events[i].location = 'Iron City';
                        }
                        else if (locationSplit[0] == "The") {
                            events[i].location = 'The Nick';
                        }
                        else if (locationSplit[0] == "Saturn") {
                            events[i].location = 'Saturn';
                        }
                        else {
                            events[i].location = 'Substrate Radio';
                        }
                        eventArray.push(events[i]);
                        calendarArray.push(eventArray);
                        calendarDay = eventDate;
                        calendarMonth = eventMonth;
                    } else { // not a new day
                        var location = String(events[i].location);
                        var locationSplit = location.split(' ');
                        if (locationSplit[0] == "Iron") {
                            events[i].location = 'Iron City';
                        } 
                        else if (locationSplit[0] == "The") {
                            events[i].location = 'The Nick';
                        }
                        else if (locationSplit[0] == "Saturn") {
                            events[i].location = 'Saturn';
                        }
                        else {
                            events[i].location = 'Substrate Radio';
                        }
                        var eventArray = calendarArray[calendarArray.length - 1];
                        eventArray.push(events[i]);
                    }
                }
                $scope.calendar = calendarArray;
                console.log(calendarArray);
            });


        //Getting Ads ====================================
        $http({
            method: 'GET',
            url: '/api/ads/even'   // this might need to be before /ads
        }).then(function (success) {
            console.log(success.data);
            $scope.adArray2 = success.data;
            console.log('this is adArray2: ');
            console.log($scope.adArray2);
            //setting up ad carousel 2==================
            for (i = 0; i < $scope.adArray2.length; i++) {
                var featuredAd2 = $scope.adArray2[i];
                console.log('check it:')
                console.log($scope.adArray2[i]);
                var adSlide2 = {
                    image: featuredAd2.imageurl
                };
                $scope.adSlides2.push(adSlide2);
            }
        }, function (err) {
            console.log(err);
        });


        $http({
            method: 'GET',
            url: '/api/ads/odd'   //gets ads with ids that are odd
        }).then(function (success) {
            console.log(success.data);
            $scope.adArray = success.data;
            console.log('this is adArray: ');
            console.log($scope.adArray);
            //setting up ad carousel 1 ==================
            for (i = 0; i < $scope.adArray.length; i++) {
                var featuredAd = $scope.adArray[i];
                console.log('check it:')
                console.log($scope.adArray[i]);
                var adSlide = {
                    image: featuredAd.imageurl
                };
                $scope.adSlides.push(adSlide);
            }
        }, function (err) {
            console.log(err);
        });




        //----------------------------------------------


        //Getting Featured Events =========================
        $http({
            method: 'GET',
            url: '/api/featuredevents'
        }).then(function (success) {
            console.log(success.data);
            $scope.featuredEventArray = success.data;
            console.log('this is featuredEventArray: ');
            console.log($scope.featuredEventArray);
            //setting up carousel ==================
            for (i = 0; i < $scope.featuredEventArray.length; i++) {
                var featuredEvent = $scope.featuredEventArray[i];
                console.log('check it:');
                console.log($scope.featuredEventArray[i]);
                var eventSlide = {
                    image: featuredEvent.imageurl
                };
                $scope.eventSlides.push(eventSlide);

            }
        }, function (err) {
            console.log(err);
        });


        //----------------------------------------------
        $scope.dj = Users.getDj();
        console.log($scope.dj);

        $scope.podcasts = Podcasts.query();
        console.log($scope.podcasts);

        $scope.ads = Ads.query();
        console.log($scope.ads);

        $scope.featuredEvents = FeaturedEvents.query();
        console.log($scope.featuredEvents);

        //+++++++++++++++++++++++++++++++++++++++++++++++++
        // $scope.missionStatement = MissionStatements.query();

        $http({
            method: 'GET',
            url: '/api/mission'
        }).then(function(success){
            $scope.missionStatement = success.data[0].statement;
        }, function(err){
            console.log(err);
        })

        SEOService.setSEO({
            title: 'Substrate Radio | Home',
            description: 'Welcome to Substrate Radio',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('CalendarController', ['$scope', '$location', 'SEOService', 'CalendarService', function ($scope, $location, SEOService, CalendarService) {

        var d = new Date();
        var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
        var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);

        var timeMin = firstDay.toISOString();
        var timeMax = lastDay.toISOString();

        console.log(timeMin);
        console.log(timeMax);

        CalendarService.getEvents(1000, timeMin, timeMax)
            .then(function (events) {
                var calendarArray = [];
                var calendarDay;
                var calendarMonth;
                for (i = 0; i < events.length; i++) {
                    var eventDate = new Date(events[i].start.dateTime).getDate();
                    var eventMonth = new Date(events[i].start.dateTime).getMonth();
                    if (!calendarDay || !calendarMonth || eventDate != calendarDay || eventMonth != calendarMonth) { // new day
                        var eventArray = [];
                        var location = String(events[i].location);
                        var locationSplit = location.split(' ');
                        if (locationSplit[0] == "Iron") {
                            events[i].location = 'Iron City';
                        }
                        else if (locationSplit[0] == "The") {
                            events[i].location = 'The Nick';
                        }
                        else if (locationSplit[0] == "Saturn") {
                            events[i].location = 'Saturn';
                        }
                        else {
                            events[i].location = 'Substrate Radio';
                        }
                        console.log(events[i].location);
                        eventArray.push(events[i]);
                        calendarArray.push(eventArray);
                        calendarDay = eventDate;
                        calendarMonth = eventMonth;
                    } else { // not a new day
                        var location = String(events[i].location);
                        var locationSplit = location.split(' ');
                        if (locationSplit[0] == "Iron") {
                            events[i].location = 'Iron City';
                        } 
                        else if (locationSplit[0] == "The") {
                            events[i].location = 'The Nick';
                        }
                        else if (locationSplit[0] == "Saturn") {
                            events[i].location = 'Saturn';
                        }
                        else {
                            events[i].location = 'Substrate Radio';
                        }
                        console.log(events[i].location);
                        var eventArray = calendarArray[calendarArray.length - 1];
                        eventArray.push(events[i]);
                    }
                }
                $scope.calendar = calendarArray;
            });

            var d = new Date();
            var month = new Array();
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
            var n = month[d.getMonth()];
            $scope.monthOfTheYear = n;


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
    .controller('AdminController', ['$route', 'Ads', 'FeaturedEvents', '$scope', '$location', 'UserService', 'SEOService', 'Users', 'Posts', '$http', 'MissionStatements', function ($route, Ads, FeaturedEvents, $scope, $location, UserService, SEOService, Users, Posts, $http, MissionStatements) {
        console.log('Admin Controller');
        UserService.requireLogin();
        UserService.isLoggedIn();
        UserService.isAdmin();

        $('#missionStatementsDiv').hide();
        $('#magazineDiv').hide();
        $('#usersDiv').hide();
        $('#featuredEventsDiv').hide();
        $('#adsDiv').hide();
        $('.mininavbar').hide();

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

        $scope.showMissionStatementDetails = function () {
            $('#missionStatementsDiv').show();
            $('#magazineDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').hide();
            $('#usersDiv').hide();
            $('#publishedMissionStatementsDiv').hide();
            $('#unpublishedMissionStatementsDiv').hide();
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
            $('.mininavbaradmin').show();
        };

        $scope.showPostDetails = function () {
            $('#magazineDiv').show();
            $('#missionStatementsDiv').hide();
            $('#usersDiv').hide();
            $('#unpublishedPostsDiv').hide();
            $('#publishedPostsDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').hide();
            $('.mininavbaradmin').show();

        }

        $scope.showPublishedPosts = function () {
            $('#publishedPostsDiv').show();
            $('#unpublishedPostsDiv').hide();
            $('.mininavbaradmin').show();

        }

        $scope.showUnpublishedPosts = function () {
            $('#publishedPostsDiv').hide();
            $('#unpublishedPostsDiv').show();
            $('.mininavbaradmin').show();

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
            $('.mininavbaradmin').show();

        }

        $scope.showPublishedEvents = function () {
            $('#publishedEventsDiv').show();
            $('#unpublishedEventsDiv').hide();
            $('.mininavbaradmin').show();

        }

        $scope.showUnpublishedEvents = function () {
            $('#publishedEventsDiv').hide();
            $('#unpublishedEventsDiv').show();
            $('.mininavbaradmin').show();

        }

        $scope.showAdDetails = function () {
            $('#missionStatementsDiv').hide();
            $('#magazineDiv').hide();
            $('#usersDiv').hide();
            $('#featuredEventsDiv').hide();
            $('#adsDiv').show();
            $('#publishedAdsDiv').hide();
            $('#unpublishedAdsDiv').hide();
            $('.mininavbaradmin').show();

        }

        $scope.showPublishedAds = function () {
            $('#publishedAdsDiv').show();
            $('#unpublishedAdsDiv').hide();
            $('.mininavbaradmin').show();

        }

        $scope.showUnpublishedAds = function () {
            $('#publishedAdsDiv').hide();
            $('#unpublishedAdsDiv').show();
            $('.mininavbaradmin').show();

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

        SEOService.setSEO({
            title: 'Substrate Radio | Admin',
            description: 'Do your thing boss-man',
            image: 'http://' + $location.host() + '/images/blog.png',
            url: $location.absUrl()
        });
    }])
    .controller('ContactController', ['$scope', 'Contact', '$location', function ($scope, Contact, $location) {
        console.log("ContactController");
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
        UserService.isAdmin();

        UserService.me();
        var userId = $routeParams.id;

        $scope.featuredUser = Users.get({ id: userId }, function () {
            console.log('The user is: ' + $scope.featuredUser.firstname);
            $scope.featuredUser.role = String($scope.featuredUser.role);
            $scope.featuredUser.dj = String($scope.featuredUser.dj);
            $scope.id = $scope.featuredUser.id;
            $scope.firstname = $scope.featuredUser.firstname;
            $scope.lastname = $scope.featuredUser.lastname;
            $scope.email = $scope.featuredUser.email;
            $scope.password = $scope.featuredUser.password;
            $scope.role = $scope.featuredUser.role;
            $scope.dj = $scope.featuredUser.dj;
            $scope.imageurl = $scope.featuredUser.imageurl;
            $scope.bio = $scope.featuredUser.bio;

            console.log('Controllers.js/UpdateUserController: The user is ');
            console.log($scope.featuredUser);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.dj ' + $scope.featuredUser.dj);

            console.log('Controllers.js/UpdateUserController: $scope.dj = ' + $scope.dj);
        });

        $scope.updateUser = function () {
            console.log('Controllers.js/UpdateUserController: entered the updateUser function');

            $scope.featuredUser.id = $scope.id;
            $scope.featuredUser.firstname = $scope.firstname;
            $scope.featuredUser.lastname = $scope.lastname;
            $scope.featuredUser.email = $scope.email;
            $scope.featuredUser.password = $scope.password;
            $scope.featuredUser.role = $scope.role;
            $scope.featuredUser.dj = $scope.dj;
            $scope.featuredUser.imageurl = $scope.imageurl;
            $scope.featuredUser.bio = $scope.bio;

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.name' + $scope.featuredUser.firstname + ' ' + $scope.featuredUser.lastname);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.email ' + $scope.featuredUser.email);

            console.log('Controllers.js/UpdateUserController: $scope.featuredUser.role ' + $scope.featuredUser.role);

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
    .controller('PodController', ['$scope', 'Pods', function ($scope, Pods) {
        console.log('PodController');

        $scope.pod = Pods.query();
        console.log($scope.allpod);


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