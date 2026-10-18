// LuCI view.extend receives instance members, not static constructor members.
declare namespace LuCI.view {
	function extend<TMembers extends object>(
		members: TMembers & ThisType<LuCI.baseclass.ExtendedInstance<LuCI.view, TMembers>>,
	): LuCI.baseclass.ExtendableConstructor<LuCI.baseclass.ExtendedInstance<LuCI.view, TMembers>>;
}
