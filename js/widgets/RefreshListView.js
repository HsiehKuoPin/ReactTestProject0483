'use strict'

var React = require('react');

var {
    ListView,
    Platform,
    TouchableHighlight,
    View,
    Text,
    Image,
    RefreshControl,
} = require('react-native');


// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

var GiftedListView = React.createClass({

    getDefaultProps() {
        return {
            customStyles: {},
            initialListSize: 10,
            isShowFirstLoadView: false,
            firstLoader: true,
            pagination: true,
            refreshable: true,
            refreshableColors: undefined,
            refreshableProgressBackgroundColor: undefined,
            refreshableSize: undefined,
            refreshableTitle: undefined,
            refreshableTintColor: undefined,
            renderRefreshControl: null,
            headerView: null,
            sectionHeaderView: null,
            scrollEnabled: true,
            withSections: false,
            onFetch(page, callback, options) {
                callback([]);
            },
            onRefresh(callback, options) {
                callback([]);
            },
            initDefData: [],

            paginationFetchingView: null,
            paginationAllLoadedView: null,
            paginationWaitingView: null,
            emptyView: null,
            renderSeparator: null,
            showFirstLoadView: null,
        };
    },

    propTypes: {
        customStyles: React.PropTypes.object,
        initialListSize: React.PropTypes.number,
        isShowFirstLoadView: React.PropTypes.bool,
        firstLoader: React.PropTypes.bool,
        pagination: React.PropTypes.bool,
        refreshable: React.PropTypes.bool,
        refreshableColors: React.PropTypes.array,
        refreshableProgressBackgroundColor: React.PropTypes.string,
        refreshableSize: React.PropTypes.string,
        refreshableTitle: React.PropTypes.string,
        refreshableTintColor: React.PropTypes.string,
        renderRefreshControl: React.PropTypes.func,
        headerView: React.PropTypes.func,
        sectionHeaderView: React.PropTypes.func,
        scrollEnabled: React.PropTypes.bool,
        withSections: React.PropTypes.bool,
        onFetch: React.PropTypes.func,
        onRefresh: React.PropTypes.func,

        paginationFetchingView: React.PropTypes.func,
        paginationAllLoadedView: React.PropTypes.func,
        paginationWaitingView: React.PropTypes.func,
        emptyView: React.PropTypes.func,
        renderSeparator: React.PropTypes.func,
        showFirstLoadView: React.PropTypes.func,
    },

    _setPage(page) {
        this._page = page;
    },
    _getPage() {
        return this._page;
    },
    _setRows(rows) {
        this._rows = rows;
    },
    _getRows() {
        return this._rows;
    },

    /**
     * 加载更多数据中
     * @returns {XML}
     */
    paginationFetchingView() {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView();
        }

        return (
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    加载数据中...
                </Text>
            </View>
        );
    },

    /**
     * 所有数据已经加载完毕
     * @returns {XML}
     */
    paginationAllLoadedView() {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    已经没有更多数据
                </Text>
            </View>
        );
    },
    paginationWaitingView(paginateCallback) {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView(paginateCallback);
        }

        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    点击加载
                </Text>
            </TouchableHighlight>
        );
    },
    headerView() {
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
            return null;
        }
        return this.props.headerView();
    },
    emptyView(refreshCallback) {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style={[this.defaultStyles.defaultView, this.props.customStyles.defaultView]}>
                <Text style={[this.defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                    对不起，当前没有可以显示的数据
                </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}>
                    <Text>
                        点击刷新
                    </Text>
                </TouchableHighlight>
            </View>
        );
    },
    renderSeparator() {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View style={[this.defaultStyles.separator, this.props.customStyles.separator]}/>
        );
    },

    getInitialState() {
        this._setPage(1);
        this._setRows([]);

        var ds = null;
        if (this.props.withSections === true) {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            });
            return {
                dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
                isShowFirstLoadView: this.props.isShowFirstLoadView,
            };
        } else {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });
            return {
                dataSource: ds.cloneWithRows(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
                isShowFirstLoadView: this.props.isShowFirstLoadView,
            };
        }
    },

    /**
     * 显示第一次加载页面
     * @returns {XML}
     */
    showFirstLoadView() {
        if (this.props.isShowFirstLoadView) {
            this.props.onRefresh(this.addRowAndUpdateState);
        }
    },


    /**
     * 添加到数据且更新UI
     * @param rows
     * @param options
     */
    addRowAndUpdateState(rows = [], options = {}) {
        this.state.isShowFirstLoadView = options.isShowFirstLoadView;
        this._updateRows(rows, options);
    },

    // componentDidMount() {
    //     this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: true});
    // },

    setNativeProps(props) {
        this.refs.listview.setNativeProps(props);
    },

    _refresh() {
        this._onRefresh({external: true});
    },

    _onRefresh(options = {}) {
        // if (this.isMounted()) {
            this.setState({
                isRefreshing: true,
            });
            this._setPage(1);
            // this.props.onFetch(this._getPage(), this._postRefresh, options);
            this.props.onRefresh(this.addRowAndUpdateState,options);

        // }
    },

    _postRefresh(rows = [], options = {}) {
        // if (this.isMounted()) {
            this._updateRows(rows, options);
        // }
    },

    _onPaginate() {
        if (this.state.paginationStatus === 'allLoaded') {
            return null
        } else {
            this.setState({
                paginationStatus: 'fetching',
            });
            this.props.onFetch(this._getPage(), this._postPaginate, {});
        }
    },

    _postPaginate(rows = [], options = {}) {
        this._setPage(this._getPage() + 1);
        var mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }
        this._updateRows(mergedRows, options);
    },

    _updateRows(rows = [], options = {}) {
        if (rows !== null) {
            this._setRows(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            } else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            }
        } else {
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
    },

    _renderPaginationView() {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
            return this.paginationFetchingView();
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
            return this.paginationWaitingView(this._onPaginate);
        } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
            return this.paginationAllLoadedView();
        } else if (this._getRows().length === 0) {
            return this.emptyView(this._onRefresh);
        } else {
            return null;
        }
    },

    renderRefreshControl() {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({onRefresh: this._onRefresh});
        }
        return (
            <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefreshing}
                colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor}
                title={this.props.refreshableTitle}
            />
        );
    },

    _toEnd() {
        console.log("0000000底部0000000000");
        // console.log("this._getPage()：" + this._getPage());
        //第一页的时候不触发加载下一页加载事件
        if(!this.state.isShowFirstLoadView){
            this._onPaginate(this._getPage(), this._postPaginate, {});
        }
    },

    render() {

        // console.log("this.state.isShowFirstLoadView:" + this.state.isShowFirstLoadView);
        // if(this.state.isShowFirstLoadView){
        //     this.showFirstLoadView();
        // }
            return (
                <View style={{flex:1}}>
                    {
                        this.state.isShowFirstLoadView ? (

                            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                                <Image onLoad={this.showFirstLoadView} source={require('../../img/loading.gif')} style={{width: 80, height: 80,}}/>
                            </View>
                        ) : (
                            <ListView
                                ref="listview"
                                dataSource={this.state.dataSource}
                                renderRow={this.props.rowView}
                                renderSectionHeader={this.props.sectionHeaderView}
                                renderHeader={this.headerView}
                                renderFooter={this._renderPaginationView}
                                renderSeparator={this.renderSeparator}
                                removeClippedSubviews={false}

                                automaticallyAdjustContentInsets={false}
                                scrollEnabled={this.props.scrollEnabled}
                                canCancelContentTouches={true}
                                refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}
                                enableEmptySections={true}

                                onEndReached={this._toEnd}
                                onEndReachedThreshold={20}

                                {...this.props}

                                style={this.props.style}
                            />
                        )
                    }
                </View>

            );

    },

    defaultStyles: {
        separator: {
            height: 1,
        },
        actionsLabel: {
            fontSize: 12,
        },
        paginationView: {
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        defaultView: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        defaultViewTitle: {
            fontSize: 13,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 15,
        },
    },
});


module.exports = GiftedListView;
