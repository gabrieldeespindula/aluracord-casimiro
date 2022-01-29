import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ1OTUyNywiZXhwIjoxOTU5MDM1NTI3fQ.wXWeZGgrfHGAxh-VjO4vM8k9CdI-FxTKNs6HBkUetsc';
const SUPABASE_URL = 'https://zuwkpddkqbciiykoggfo.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function CheckRealTimeMessage(addMessage, updatedMessageFunction) {
	return supabaseClient
		.from('messages')
		.on('INSERT', (res) => {
			addMessage(res.new);
		})
		.on('UPDATE', (res) => {
			updatedMessageFunction(res.new);
		})
		.subscribe();
}

export default function ChatPage() {
	const router = useRouter();
	const username = router.query.username;
	const [message, setMessage] = React.useState();
	const [messageList, setMessageList] = React.useState([]);

	React.useEffect(() => {
		supabaseClient
			.from('messages')
			.select('*')
			.eq('status', 'true')
			.order('id', { ascending: false })
			.then(({ data }) => {
				setMessageList(data);
			});

		const subscription = CheckRealTimeMessage(
			(newMessage) => {
				setMessageList((actualValueList) => {
					return [
						newMessage,
						...actualValueList,
					]
				});
			}, (updatedMessage) => {
				if (!updatedMessage.status) {
					setMessageList((actualValueList) => {
						const newMessages = actualValueList.filter(message => message.id != updatedMessage.id);
						setMessageList(newMessages);
					});
				}

			});

		return () => {
			subscription.unsubscribe();
		}

	}, [])


	async function handleNewMessage(newMessage) {
		if (newMessage != '') {
			const message = {
				from: username,
				text: newMessage,
			}

			await supabaseClient
				.from('messages')
				.insert([message]);

			setMessage('');
		}
	}

	async function removeMessageById(id) {
		await supabaseClient
			.from('messages')
			.update([{ status: false }])
			.eq('id', id);
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

					<MessageList messages={messageList} removeMessageById={removeMessageById} />

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

						<ButtonSendSticker
							onStickerClick={(sticker) => {
								handleNewMessage(':sticker: ' + sticker);
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
								src={`https://github.com/${actualMessage.from}.png`}
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
								{new Date(actualMessage.created_at).toLocaleString()}
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
									mainColor: appConfig.theme.colors.primary[800],
									mainColorLight: appConfig.theme.colors.primary[500],
									mainColorStrong: appConfig.theme.colors.primary[500],
									mainColorHighlight: appConfig.theme.colors.primary[500],
								}}

								onClick={() => props.removeMessageById(actualMessage.id)}
							></Button>
						</Box>

						{actualMessage.text.startsWith(':sticker:')
							? (
								<Image src={actualMessage.text.replace(':sticker:', '')} />
							)
							: (
								actualMessage.text
							)
						}

					</Text>
				)
			})}
		</Box>
	)
}