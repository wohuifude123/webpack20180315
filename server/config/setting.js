/**
 * environment
 * 全局配置文件，总体设置
 * 应用过程中不要进行修改
 */

var ENV = (function(){
    // 指定首页地址
    var defaultPage = '';
    /*
    *topic接口说明
    * /topic/event 动态资源
    * '' 静态假数据
    * */

    return {

        // 首页标题
        pageTitleCustom: '项目名',
        // 默认首页
        defaultPage: defaultPage,


        // 展示大屏
        telecommunication: {
            serverTopic:'/topic/telecommunication-receive',
            clientTopic:'/topic/telecommunication-transmission',
            interval: 60, // 分钟
            // 读取真实数据时间间隔
            minute: 2.1, // 分钟
            // 读取模拟数据
            mockDataBoolean: false,
            // 读取真实数据时间间隔
            mockDataTime: 0.5 // 分钟
        },
        ws: {
            // '10.11.12.73',
            // '192.168.31.75:61623'
            url: '10.11.12.73',
            port: 8080,
            apolloUrl: '10.11.12.73',
            apolloPort: 61623,
            username: 'admin',
            password: 'password'
        },

        /**
         * 功能：自定义快捷键
         * 作者：Abbott.liu
         * 可以使用键位如下：
         *      快捷键必须是下面的形式：Ctrl+E 或者 Up
         *      其他允许的键：
         *          所有数字、字母键 – abc 012
         *          特殊字符 - 任何标准键盘上的特殊字符都可以
         *          特殊按键如下
         *              Tab|Space|Return|Enter|Backspace|Scroll_lock|Caps_lock|Num_lock|Pause
         *              Insert|Home|Delete|End|Page_up|Page_down|Left|Up|Right|Down
         *              F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12
         *          所有这些按键都是不区分大小写的，可以放心填写
         */

        keyboard:{
            fullScreen: 'Ctrl+D',
            homePage: 'Up', // 直接返回首页
            endPage: 'Down',
            previousPage: 'left',
            nextPage: 'right',
            pointOn:'Ctrl+J',
            pointOff:'Ctrl+K',
            autoPlayOn: 'Ctrl+P',
            autoPlayOff: 'Ctrl+T',
            helpOn: 'Ctrl+J+O',
            helpOff: 'Ctrl+K+P',
            imagePlayOn:'Ctrl+N',
            imagePlayOff:'Ctrl+M'
        }
    }
})();
