import React from 'react';
import './loader.scss'

export default () => {
    return  <div className={'loading-part'}> <div className={'loading-text'}>Loading</div>
        <div className={'line-loading'}></div>
    </div>
}