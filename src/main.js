/**
 * 作者：Abbott.liu
 * 时间：2017年11月
 * 功能：网站入口文件
 */
import _ from 'lodash';

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['人生里世界=Hello', 'webpack'], ' ');
    return element;

}

document.body.appendChild(component());
