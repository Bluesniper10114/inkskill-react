// @flow

import { IMAGES_URL, SITE_URL } from 'core/config/env';
// import videoPic from 'assets/img/video-profile.jpg';
import { MIN_WIDTH, MIN_HEIGHT, MAX_FILE_SIZE } from 'core/constants';
import postPic from 'assets/img/post-pic.jpg';
import profilePic from 'assets/img/profile-pic.jpg';
import profilePic2 from 'assets/img/profile-pic-2.jpg';

let img = 0;

type FileName = string;
type ImageData = {
  filename: FileName;
  fullview_filename: FileName;
  tattoo_image: string;
  unique_id: string;
  url: string;
  previewUrl: string;
};
type ImageSize = {
  width: number,
  height: number,
};
type Rectangle = {
  x: number,
  y: number,
  width: number,
  height: number,
};

const isUrl = (image: string) => /^https?:/.test(image) || /\//.test(image);

const mockImage = (type) => {
  if (type === 'avatar') {
    img += 1;
    return img % 2 === 1 ? profilePic2 : profilePic;
  }

  return postPic;
};

const getFileName = (image: ImageData, full) =>
  (full ? image.fullview_filename : image.tattoo_image || image.filename) || '';

const getName = (image: ImageData | FileName, full = false) => {
  if (typeof image === 'string') {
    return image;
  }

  const filename = getFileName(image, full);
  if (!filename || !image.unique_id) return false;

  return `${image.unique_id}/${filename}`;
};


export const getPreviewUrl = (image: ImageData) => image.previewUrl;

export const getImageUrl = (image: ImageData | FileName, type: ImageType = 'images') => {
  if (image.url) {
    return image.url;
  }
  const name = getName(image);
  if (image === 'mock' || !name) {
    return mockImage(type);
  }

  return isUrl(name) ? name : `${IMAGES_URL}/${type}/${name}`;
};

export const getFullImageUrl = (image: ImageData) => {
  const name = getName(image, true) || '';
  return isUrl(name) ? name : `${IMAGES_URL}/images/${name}`;
};

export const getDownloadUrl = (image: ImageData, full: boolean = false) => {
  const filename = getFileName(image, full);
  return `${SITE_URL}/download.php?id=${image.unique_id}&df=${filename}`;
};

export const cropImage = (data: string, { x, y, width, height }: Rectangle) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx: any = canvas.getContext('2d');
  const image = new Image();
  image.src = data;
  ctx.drawImage(image,
    x, y, width, height,
    0, 0, width, height
  );

  return canvas.toDataURL('image/jpeg', 0.95);
};

export const readImage = (src: string, callback: Function) => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = src;
  image.onload = () => callback(image);
};

export const rotateImage = (data: string, angle: number, callback: Function) => {
  readImage(data, (image) => {
    const invert = angle % 90 % 2 === 0;
    const height = invert ? image.width : image.height;
    const width = invert ? image.height : image.width;
    const radians = Math.PI / 180;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx: any = canvas.getContext('2d');
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle * radians);
    ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
    ctx.restore();

    callback({
      data: canvas.toDataURL('image/jpeg', 0.95),
      width,
      height,
    });
  });
};

export const readFBImage = (image: Image, callback: Function) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx: any = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, image.width, image.height);

  callback({
    data: canvas.toDataURL('image/jpeg', 1),
    height: image.height,
    width: image.width,
  });
};

export const readImageFile = (file: string | Object, callback: Function) => {
  // read by url
  if (typeof file === 'string') {
    readImage(file, image => readFBImage(image, callback));
    return;
  }

  const reader = new FileReader();

  reader.onload = () => readImage(reader.result, image => callback({
    data: reader.result,
    height: image.height,
    width: image.width,
  }));

  if (file) reader.readAsDataURL(file);
};

export const getMinSize = (
  image: ImageSize,
  minWidth: number = MIN_WIDTH,
  minHeight: number = MIN_HEIGHT
) => {
  const maxSide = Math.max(image.width, image.height);
  const minCropSize = Math.round((minWidth * minHeight) / maxSide);

  return Math.min(minWidth, minHeight, minCropSize);
};

export const validateImage = (
  image: ImageSize,
  minWidth: number = MIN_WIDTH,
  minHeight: number = MIN_HEIGHT
) =>
  image.width >= minWidth && image.height >= minHeight;

export const validateFileSize = (fileSize: number, maxFileSize: number = MAX_FILE_SIZE) =>
  fileSize <= maxFileSize;

export const getImageError = (
  image: ImageSize,
  fileSize: number,
  minWidth: number = MIN_WIDTH,
  minHeight: number = MIN_HEIGHT,
  maxFileSize: number = MAX_FILE_SIZE
) => {
  const invalid = !validateImage(image, minWidth, minHeight);

  // eslint-disable-next-line curly
  if (invalid) return `
    Wrong image dimensions. \n
    Given: ${image.width}x${image.height}, minimal: ${minWidth}x${minHeight}
  `;

  const invalidSize = fileSize ? !validateFileSize(fileSize, maxFileSize) : false;

  // eslint-disable-next-line curly
  if (invalidSize) return `
    Too large file size. \n
    Given: ${fileSize} bytes, max: 5MB
  `;

  return false;
};
