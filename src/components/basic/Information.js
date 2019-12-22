import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { handleLineReturn } from '../../utils/utils'

const query = graphql`
	{
		allContentfulInformation {
			edges {
				node {
					key
					value {
						value
					}
				}
			}
		}
	}
`

/*
 * Can be used as a classical component (display the value)
 * or as a getter when child is a function.
 */
const Information = ({ name, children }) => (
	<StaticQuery
		query={query}
		render={data => {
			const find = data.allContentfulInformation.edges.filter(e => {
				return e.node.key === name
			})

			const isFunction = typeof children === 'function'

			if (find.length === 0)
				return isFunction ? children(null) : `Information '${name}' not found`

			const value = find[0].node.value

			return isFunction ? children(value.value) : handleLineReturn(value.value)
		}}
	/>
)

Information.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.func
}

export default Information
