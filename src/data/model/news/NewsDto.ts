import * as Yup from 'yup';
import { News } from './News';
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';

const NewsValidationScheme = Yup.object().shape({
    title: Yup.string().required('titleIsRequired'),
    author: Yup.string().nullable(),
    url: Yup.string().nullable(),
    thumb_2x: Yup.string().nullable(),
    updated_at: Yup.number().nullable(),
})

export type NewsDto = Yup.InferType<typeof NewsValidationScheme>

export function convertToNews (dto: NewsDto): News {
    return {
        id: uuidv4(),
        title: dto.title ?? '',
        url: dto.url ?? '',
        thumbnail: dto.thumb_2x ?? '',
        creator: `${dto.author ?? 'Unknown'} (${formatTimestamp(dto.updated_at ?? 0)})`,
    }
}

function formatTimestamp(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000)
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
}
