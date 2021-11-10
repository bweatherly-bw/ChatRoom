import React from 'react';
import { Channel, ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ChatIcon from '../assets/chat.png'
import LogoutIcon from '../assets/logout.png'
const cookies = new Cookies;

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1" >
            <div className="icon1__inner" >
                <img src={ChatIcon} alt="ReactChat" width="30" />
            </div>

        </div> 
        <div className="channel-list__sidebar__icon2" >
            <div className="icon1__inner" onClick={logout} >
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

const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId")
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }
    return (
        <>
            < SideBar logout={logout} /> 
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
                    isCreating={isCreating}
                    setIsCreating={setIsEditing}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
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
                    isCreating={isCreating}
                    setIsCreating={setIsEditing}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
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