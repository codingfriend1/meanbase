var basic = {
	role: 'basic',
	permissions: {
		editContent: false,
		publishContent: false,
		deleteContent: false,
		manageMedia: false,
		restrictAccess: false,
		manageExtensions: false,
		moderateComments: false,
		manageUsers: false,
		manageRoles: false,
		changeSiteSettings: false,
		importExportData: false,
		deleteSite: false,
		viewAnalytics: false,
		allPrivilages: false,
		receiveEmails: false
	}
};

var level1 = {
	role: 'level 1',
	permissions: {
		editContent: true,
		publishContent: false,
		deleteContent: false,
		manageMedia: false,
		restrictAccess: false,
		manageExtensions: false,
		moderateComments: false,
		manageUsers: false,
		manageRoles: false,
		changeSiteSettings: false,
		importExportData: false,
		deleteSite: false,
		viewAnalytics: false,
		allPrivilages: false,
		receiveEmails: false
	}
};

var level2 = {
	role: 'level 2',
	permissions: {
		editContent: true,
		publishContent: true,
		deleteContent: false,
		manageMedia: true,
		restrictAccess: false,
		manageExtensions: false,
		moderateComments: false,
		manageUsers: false,
		manageRoles: false,
		changeSiteSettings: false,
		importExportData: false,
		deleteSite: false,
		viewAnalytics: false,
		allPrivilages: false,
		receiveEmails: false
	}
};

var level3 = {
	role: 'level 3',
	permissions: {
		editContent: true,
		publishContent: true,
		deleteContent: true,
		manageMedia: true,
		restrictAccess: true,
		manageExtensions: true,
		moderateComments: true,
		manageUsers: false,
		manageRoles: false,
		changeSiteSettings: false,
		importExportData: false,
		deleteSite: false,
		viewAnalytics: false,
		allPrivilages: false,
		receiveEmails: false
	}
};

var level4 = {
	role: 'level 4',
	permissions: {
		editContent: true,
		publishContent: true,
		deleteContent: true,
		manageMedia: true,
		restrictAccess: true,
		manageExtensions: true,
		moderateComments: true,
		manageUsers: true,
		manageRoles: true,
		changeSiteSettings: false,
		importExportData: false,
		deleteSite: false,
		viewAnalytics: true,
		allPrivilages: false,
		receiveEmails: false
	}
};

var level5 = {
	role: 'level 5',
	permissions: {
		editContent: true,
		publishContent: true,
		deleteContent: true,
		manageMedia: true,
		restrictAccess: true,
		manageExtensions: true,
		moderateComments: true,
		manageUsers: true,
		manageRoles: true,
		changeSiteSettings: true,
		importExportData: true,
		deleteSite: false,
		viewAnalytics: true,
		allPrivilages: false,
		receiveEmails: false
	}
};

var admin = {
	role: 'admin',
	permissions: {
		editContent: true,
		publishContent: true,
		deleteContent: true,
		manageMedia: true,
		restrictAccess: true,
		manageExtensions: true,
		moderateComments: true,
		manageUsers: true,
		manageRoles: true,
		changeSiteSettings: true,
		importExportData: true,
		deleteSite: true,
		viewAnalytics: true,
		allPrivilages: true,
		receiveEmails: false
	}
};

module.exports = [basic, level1, level2, level3, level4, level5, admin];
