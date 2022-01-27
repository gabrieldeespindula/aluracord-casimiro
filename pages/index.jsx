import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';


function Title(props) {
	const Tag = props.tag || 'h1';
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
		</>
	);
}

export default function PaginaInicial() {
	const [username, setUsername] = React.useState('');
	const router = useRouter();

	return (
		<>
			<Box
				styleSheet={{
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					backgroundColor: appConfig.theme.colors.primary[500],
					backgroundImage: 'url(https://c.tenor.com/LqP4B1GKGqkAAAAd/casimiro.gif)',
					backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
				}}
			>
				<Box
					styleSheet={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: {
							xs: 'center',
							sm: 'space-between',
							lg: 'center'
						},
						flexDirection: {
							xs: 'column',
							sm: 'row',
							lg: 'column'
						},
						width: 'calc(100% - 32px)', maxWidth: '700px',
						height: { lg: '100%' }, maxHeight: { lg: '700px' },
						borderRadius: {
							xs: '5px',
							sm: '5px',
							lg: '50%'
						}, padding: '32px', margin: '16px',
						boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
						backgroundColor: {
							xs: appConfig.theme.colors.neutrals[700],
							sm: appConfig.theme.colors.neutrals[700],
							lg: appConfig.theme.colors.neutrals[900]
						},
						backgroundImage: {
							xs: 'url(https://image.winudf.com/v2/image1/Y29tLnppcHBlcjIubG9ja3NjcmVlbi52YXNjb19zY3JlZW5fMl8xNTU5ODE0MjQzXzA5Mg/screen-2.jpg?fakeurl=1&type=.jpg)',
							sm: 'url(https://image.winudf.com/v2/image1/Y29tLnppcHBlcjIubG9ja3NjcmVlbi52YXNjb19zY3JlZW5fMl8xNTU5ODE0MjQzXzA5Mg/screen-2.jpg?fakeurl=1&type=.jpg)',
							lg: 'url(https://imgcentauro-a.akamaihd.net/1300x1300/87972931/bola-de-futebol-de-campo-vasco-da-gama-basic-img.jpg)'
						},
						backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
					}}
				>
					{/* Formulário */}
					<Box
						as="form"
						onSubmit={
							function (ev) {
								ev.preventDefault();
								router.push('/chat');
							}
						}
						styleSheet={{
							display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
							width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
						}}
					>
						<Title tag="h2">A Live Já Vai Começar!</Title>
						<Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
							{appConfig.name}
						</Text>

						<TextField
							value={username}
							onChange={
								function (event) {
									const value = event.target.value;
									setUsername(value);
								}
							}
							fullWidth
							textFieldColors={{
								neutral: {
									textColor: appConfig.theme.colors.neutrals[200],
									mainColor: appConfig.theme.colors.neutrals[900],
									mainColorHighlight: appConfig.theme.colors.primary[500],
									backgroundColor: appConfig.theme.colors.neutrals[800],
								},
							}}
						/>
						<Button
							type='submit'
							label='Entrar'
							fullWidth
							buttonColors={{
								contrastColor: appConfig.theme.colors.neutrals["000"],
								mainColor: appConfig.theme.colors.primary[500],
								mainColorLight: appConfig.theme.colors.primary[400],
								mainColorStrong: appConfig.theme.colors.primary[600],
							}}
						/>
					</Box>
					{/* Formulário */}


					{/* Photo Area */}
					<Box
						styleSheet={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							maxWidth: '200px',
							padding: '16px',
							backgroundColor: appConfig.theme.colors.neutrals[800],
							border: '1px solid',
							borderColor: appConfig.theme.colors.neutrals[999],
							borderRadius: '10px',
							height: {
								lg: 'min-content'
							}
						}}
					>
						<Image
							styleSheet={{
								borderRadius: '50%',
								marginBottom: '16px',
							}}
							src={`https://github.com/${username}.png`}
						/>
						<Text
							variant="body4"
							styleSheet={{
								color: appConfig.theme.colors.neutrals[200],
								backgroundColor: appConfig.theme.colors.neutrals[900],
								padding: '3px 10px',
								borderRadius: '1000px'
							}}
						>
							{username}
						</Text>
					</Box>
					{/* Photo Area */}
				</Box>
			</Box>
		</>
	);
}