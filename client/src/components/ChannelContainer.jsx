import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';



const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }
    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div> 
        )
    }
    // This is for what happens when the user create a new chat and there are NO messages in it, its empty. 
    const EmptyState = () => ( 
        <div className="channel-empty__container">
            <p className="channel-empty__first">BEGINNING OF THE CHAT HISTORY</p>
            <p className="channel-empty__second">You can send messages, links, attachments, etc.</p>
        </div>
    )

    return (
        <div className="channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}

export default ChannelContainer;