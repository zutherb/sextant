class FrameController {
    url: string;

    static $inject = ['$scope', '$routeParams'];

    constructor(private $scope,
                private $routeParams) {

        this.url = $routeParams.url;

        $scope.vm = this;
    }
}

sextant.controller('frameController', FrameController);
