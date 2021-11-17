import React, {useState} from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { AiFillStar } from 'react-icons/ai';


const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );

    const DirectPreview = () => {
        // eslint-disable-next-line
        const [favorites, setFavorites] = useState('');
        const [styleColor, setStyleColor] = useState('');

        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        console.log(members[0]);

        const _handleFavorites = (e) => {
            e.preventDefault();
            console.log(e.target.name.value);
            const data = { chatname:  e.target.name.value };

            fetch('http://localhost:5000/favs/add', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data.message);
            if(data.added){
                setStyleColor('#FFFF00');
                setFavorites(data.chatname);
            }
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }

        return (
            <div className="channel-preview__item single" style={{backgroundColor: styleColor}} >
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <form onSubmit={_handleFavorites}>
                {/* <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p> */}
                <input name="name" defaultValue={members[0]?.user?.fullName || members[0]?.user?.id}></input>
                <button type='submit'> <AiFillStar /> </button>
                </form>
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'channel-preview__wrapper__selected'
                : 'channel-preview__wrapper'
        }
        onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState)
            }
        }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
}

export default TeamChannelPreview