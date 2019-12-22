exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
	if (stage === 'build-html' || stage === 'develop-html') {
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						test: /firebase/,
						use: loaders.null()
					}
				]
			}
		})
	}
}

exports.onCreatePage = async ({ page, actions }) => {
	const { createPage } = actions

	if (page.path.match(/^\/espace-admin/)) {
		page.matchPath = '/espace-admin/*'

		createPage(page)
	}
}
