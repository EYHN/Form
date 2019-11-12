/**
 * Restart the saga every time remount.
 */
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';

/**
 * Never stop it even if the component is removed.
 */
export const DAEMON = '@@saga-injector/daemon';

/**
 * Call once until the component is unloaded.
 */
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';