const handleClick = (event) => {
	const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

	if (anchor) {
		anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
};

export default handleClick;
