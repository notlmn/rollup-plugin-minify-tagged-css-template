function css() {}

const textColor = '#212121';
const declaration = css`display: flex;`;
const otherStyles = css`
a {
	color: red;
}
`;

const x = css`
:host {
	--padding: 1rem;

	color: ${textColor};
	display: block;
	height: calc(4rem * 4);
	padding: var(--padding);
	width: calc(100vw - calc(var(--padding) * 2));
}

/* comment */
.parent .child {
	${declaration}
}

${otherStyles}
`;

const slectors = css`
* {}
E {}
E[foo] {}
E[foo = "bar"] {}
E[foo~="bar"] {}
E[foo^="bar"] {}
E[foo$="bar"] {}
E[foo*="bar"] {}
E[foo|="en"] {}
E:root {}
E:nth-child(n) {}
E:nth-last-child(n) {}
E:nth-of-type(n) {}
E:nth-last-of-type(n) {}
E:first-child {}
E:last-child {}
E:first-of-type {}
E:last-of-type {}
E:only-child {}
E:only-of-type {}
E:empty {}
E:link {}
E:visited {}
E:active {}
E:hover {}
E:focus {}
E:target {}
E:lang(fr) {}
E:enabled {}
E:disabled {}
E:checked {}
E::first-line {}
E::first-letter {}
E::before {}
E::after {}
E.warning {}
E#myid {}
E:not(s) {}
E F {}
E > F {}
E + F {}
E ~ F {}
`;

window.x = x;
window.slectors = slectors;
