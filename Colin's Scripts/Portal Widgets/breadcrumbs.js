// Breadcrumbs
if ($scope.data.sc_cat_item) {
var bc = [{label:'Services', url: '?id=services_landing'}]; //this is the first thing after home
bc[bc.length] = {label: $scope.data.sc_catalog_name, url: '?id=sc_home2&catalog_sys_id=' + $scope.data.sc_catalog};
if ($scope.data.category)
bc[bc.length] = {label: $scope.data.category.name, url: '?id=sc_category&sys_id=' + $scope.data.sc_cat_item.category + '&catalog_sys_id=' + $scope.data.sc_catalog};

 bc[bc.length] = {label: $scope.data.sc_cat_item.name, url: '#'};
$timeout(function() {
$scope.$emit('sp.update.breadcrumbs', bc);
});
spUtil.setSearchPage('sc');
} else {
var notFoundBC = [{label: $scope.page.title, url: '?id=' + $scope.data.sc_catalog_page}];
$timeout(function() {
$scope.$emit('sp.update.breadcrumbs', notFoundBC);
});
spUtil.setSearchPage('sc');
}
