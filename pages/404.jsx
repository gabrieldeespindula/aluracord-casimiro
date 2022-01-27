import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

export default function error() {
	const router = useRouter();
	return (
		<Box
			styleSheet={{
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				backgroundColor: appConfig.theme.colors.neutrals[900],
				backgroundImage: 'url(https://image.winudf.com/v2/image1/Y29tLnppcHBlcjIubG9ja3NjcmVlbi52YXNjb19zY3JlZW5fMl8xNTU5ODE0MjQzXzA5Mg/screen-2.jpg?fakeurl=1&type=.jpg)',
				backgroundSize: 'cover', backgroundBlendMode: 'multiply', backgroundRepeat: 'no-repeat',
				padding: '25px',
				minHeight: '100vh',
				height: '100 %',
			}}>
			<Box
				styleSheet={{
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					backgroundColor: appConfig.theme.colors.neutrals[999],
					borderRadius: '50%',
					width: '350px',
					height: '350px',
					boxShadow: '0 2px 10px 0 rgb(0 0 0 / 100%)',
					backgroundImage: 'url(https://imgcentauro-a.akamaihd.net/1300x1300/87972931/bola-de-futebol-de-campo-vasco-da-gama-basic-img.jpg)',
					backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
				}}>
				<Box
					styleSheet={{
						display: 'flex', alignItems: 'center', justifyContent: 'center',
						flexDirection: 'column',
						padding: '50px'
					}}>
					<Text
						variant="body4"
						styleSheet={{
							color: appConfig.theme.colors.primary[900],
							fontSize: '50px',
							padding: '20px',
							borderRadius: '5px',
							marginBottom: '25px',
							fontFamily: 'monospace'
						}}
					>
						404
					</Text>
					<Button
						label='Página não encontrada, tá?'
						fullWidth
						buttonColors={{
							contrastColor: appConfig.theme.colors.primary[200],
							mainColor: appConfig.theme.colors.neutrals[500],
							mainColorLight: appConfig.theme.colors.neutrals[400],
							mainColorStrong: appConfig.theme.colors.neutrals[600],
							mainColorHighlight: appConfig.theme.colors.primary[500],
						}}

						styleSheet={{
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[600]
							},
							focus: {
								backgroundColor: appConfig.theme.colors.neutrals[900]
							}
						}}
						onClick={
							() => {
								router.push('/');
							}
						}
					>
					</Button>
				</Box>
			</Box>

		</Box>
	)
}

// https://pbs.twimg.com/media/FDnjrHZWYAMLZ3W.jpg