import { RichText, TextMessage } from '@comen/common';
import React from 'react';

export default ({avatar,username,content}:TextMessage) => (
    <div id="text-message">
        <div id="avatar">
            <div>
                <img
                    style={{
                        height: '24px',
                        width: '24px',
                    }}
                    src={avatar as string}
                />
            </div>
        </div>
        <div id="user">{username}</div>
        <div></div>
        <div id="content">{content}</div>
    </div>
)