import React from 'react';
import { Channel, ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ChatIcon from '../assets/chat.png'
import LogoutIcon from '../assets/logout.png'

const SideBar = () => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1" >
            <div className="icon1__inner" >
                <img src={ChatIcon} alt="ReactChat" width="30" />
            </div>

        </div> 
        <div className="channel-list__sidebar__icon2" >
            <div className="icon1__inner" >
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>

        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text"> Chatter Box </p>
         </div>
)

const ChannelListContainer = () => {
    return (
        <>
            < SideBar /> 
            <div className="channel-list__list__wrapper" >
                <CompanyHeader/>
                <ChannelSearch />
                <ChannelList
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                    <TeamChannelList 
                    {...listProps}
                    type="team"
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                    { ...previewProps}
                    type="team"
                    />
                )}
            />
            </div>

            <ChannelList
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                    <TeamChannelList 
                    {...listProps}
                    type="messaging"
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview
                    { ...previewProps}
                    type="messaging"
                    />
                )}
            />
            
        </>
    );
}

export default ChannelListContainer;