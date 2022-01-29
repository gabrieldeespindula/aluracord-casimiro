import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

export default function ChatPage() {
	const [message, setMessage] = React.useState();
	const [messageList, setMessageList] = React.useState([]);

	function handleNewMessage(newMessage) {
		if (newMessage != '') {
			const message = {
				id: messageList.length + 1,
				from: 'username',
				date: (new Date().toLocaleDateString()) + ' ' + (new Date().toLocaleTimeString()),
				text: newMessage,
				edited: false
			}
			setMessageList([
				message,
				...messageList,
			])
			setMessage('');
		}
	}

	return (
		<Box
			styleSheet={{
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				backgroundColor: appConfig.theme.colors.primary[500],
				backgroundImage: 'url(https://image.winudf.com/v2/image1/Y29tLnppcHBlcjIubG9ja3NjcmVlbi52YXNjb19zY3JlZW5fMl8xNTU5ODE0MjQzXzA5Mg/screen-2.jpg?fakeurl=1&type=.jpg)',
				backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundRepeat: 'no-repeat',
				backgroundColor: appConfig.theme.colors.neutrals[400],
			}}
		>
			<Box
				styleSheet={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
					borderRadius: '5px',
					backgroundColor: appConfig.theme.colors.neutrals[700],
					height: '100%',
					maxWidth: '95%',
					maxHeight: '95vh',
					padding: '32px',
				}}
			>
				<Header />
				<Box
					styleSheet={{
						position: 'relative',
						display: 'flex',
						flex: 1,
						height: '80%',
						backgroundColor: appConfig.theme.colors.neutrals[600],
						flexDirection: 'column',
						borderRadius: '5px',
						padding: '16px',
					}}
				>

					<MessageList messages={messageList} setMessages={setMessageList} />

					<Box
						as="form"
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<TextField
							onChange={event => {
								const value = event.target.value;
								setMessage(value);
							}}

							onKeyPress={event => {
								if (event.key === 'Enter') {
									event.preventDefault();
									handleNewMessage(message);
								}
							}}
							value={message}
							placeholder="Insira sua mensagem aqui..."
							type="textarea"
							styleSheet={{
								width: 'calc(100% - 56px)',
								border: '0',
								resize: 'none',
								borderRadius: '5px',
								padding: '6px 8px',
								backgroundColor: appConfig.theme.colors.neutrals[800],
								marginRight: '12px',
								color: appConfig.theme.colors.neutrals[200],
							}}
						/>
						<Button iconName='FaArrowRight'
							styleSheet={{
								marginBottom: '8px',
								fontSize: '1.5rem',
								hover: {
									backgroundColor: appConfig.theme.colors.primary[800]
								},
								focus: {
									backgroundColor: appConfig.theme.colors.primary[900]
								},
								width: '44px',
								height: '44px',
							}}

							buttonColors={{
								contrastColor: appConfig.theme.colors.neutrals['000'],
								mainColor: appConfig.theme.colors.primary[500],
								mainColorLight: appConfig.theme.colors.primary[500],
								mainColorStrong: appConfig.theme.colors.primary[500],
								mainColorHighlight: appConfig.theme.colors.neutrals[500],
							}}

							onClick={() => { handleNewMessage(message); }}
						>
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

function Header() {
	return (
		<>
			<Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
				<Text variant='heading5'>
					Chat
				</Text>
				<Button
					variant='tertiary'
					colorVariant='neutral'
					label='Logout'
					href="/"
				/>
			</Box>
		</>
	)
}

function MessageList(props) {
	const messages = props.messages;

	function removeMessageById(id) {
		const newMessages = messages.filter(message => message.id != id);
		props.setMessages(newMessages);
	}

	return (
		<Box
			tag="ul"
			styleSheet={{
				overflow: 'scroll',
				display: 'flex',
				flexDirection: 'column-reverse',
				flex: 1,
				color: appConfig.theme.colors.neutrals["000"],
				marginBottom: '16px',
			}}
		>

			{messages.map((actualMessage) => {
				return (
					<Text
						key={actualMessage.id}
						tag="li"
						styleSheet={{
							borderRadius: '5px',
							padding: '6px',
							marginBottom: '12px',
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[700],
							}
						}}
					>
						<Box
							styleSheet={{
								marginBottom: '8px',
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<Image
								styleSheet={{
									width: '20px',
									height: '20px',
									borderRadius: '50%',
									display: 'inline-block',
									marginRight: '8px',
								}}
								src={`https://github.com/vanessametonini.png`}
							/>
							<Text tag="strong">
								{actualMessage.from}
							</Text>
							<Text
								styleSheet={{
									fontSize: '10px',
									marginLeft: '8px',
									color: appConfig.theme.colors.neutrals[300],
								}}
								tag="span"
							>
								{actualMessage.date}
							</Text>
							<Button
								iconName='FaTrashAlt'
								variant="tertiary"
								styleSheet={{
									maxWidth: '20px',
									maxHeight: '20px',
									hover: {
										backgroundColor: appConfig.theme.colors.primary[800]
									},
									focus: {
										backgroundColor: appConfig.theme.colors.primary[900]
									},
									marginLeft: 'auto',
									marginRight: '0'
								}}
								buttonColors={{
									contrastColor: appConfig.theme.colors.neutrals[999],
									mainColor: appConfig.theme.colors.neutrals[800],
									mainColorLight: appConfig.theme.colors.primary[500],
									mainColorStrong: appConfig.theme.colors.primary[500],
									mainColorHighlight: appConfig.theme.colors.neutrals[500],
								}}

								onClick={() => removeMessageById(actualMessage.id)}
							></Button>
						</Box>
						{actualMessage.text}
					</Text>
				)
			})}
		</Box>
	)
}