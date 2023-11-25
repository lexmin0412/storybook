import { nanoid } from 'nanoid'

/**
 * 自定义标识，作为临时 ID 前缀
 */
export const FRONTEND_CUSTOM_PREFIX = 'LEXMIN_STORYBOOK'

/**
 * 创建一个随机ID
 * @param withPrefix 是否携带前缀
 */
export const createFrontendCustomRandomId = (withPrefix = true) => {
	const randomId = nanoid()
	if (!withPrefix) {
		return randomId
	}
	return `${FRONTEND_CUSTOM_PREFIX}-${randomId}`
}
