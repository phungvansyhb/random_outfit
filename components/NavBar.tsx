import React from 'react';
import { Navbar, NavbarContent } from '@nextui-org/react';

export default function NavBar() {
	return (
		<Navbar
			maxWidth='full'
			isBordered>
			<NavbarContent
				className='flex gap-4'
				justify='start'></NavbarContent>
			<NavbarContent
				className='flex gap-4'
				justify='center'>
				<p className='font-bold text-inherit capitalize'>Create your outfit</p>
			</NavbarContent>
			<NavbarContent
				className='flex gap-4'
				justify='end'></NavbarContent>
		</Navbar>
	);
}
