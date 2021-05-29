import { RichText } from '@comen/common';
import { withKairo } from '@kairo/react';
import React from 'react';

interface TextProps {
    content: string | RichText;
    username: string;
    
}

export default withKairo<TextProps>(({
    username,
    content
}) => {

    return () => <div>
        {username}:{content}
    </div>;
});
