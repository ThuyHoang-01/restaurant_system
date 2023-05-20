export default function validatePhoneNumber(phoneNumber) {
  const re = /^[0-9]{10}$/;
  return re.test(phoneNumber);
}