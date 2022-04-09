function checkMemberPermissions(member, permissions){
    return member.permissions.has(permissions);
}


module.exports = {
    checkMemberPermissions
}

