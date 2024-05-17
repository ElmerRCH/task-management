from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

class Usuario:

    def __init__(self, gmail,password):
        self.gmail = gmail
        self.password = password
        
    def gmail_validator(self) -> bool:
        gmail_validator = False

        if '@' in self.gmail and self.gmail.count('@') == 1:
            local_part, domain_part = self.gmail.split('@')
            if domain_part.endswith('.com') and len(domain_part) > 4:
                if all(char.isalnum() or char in ['.', '-', '_'] for char in local_part):
                    gmail_validator = True
                    
        return gmail_validator
        
    def password_validador(self) -> bool:
        pass_validator = False
        
        if len(self.password) >= 8:
            # Verificar la presencia de caracteres especiales válidos
            special_characters = ".!#$%^&*@"
            if any(char in special_characters for char in self.password):
                # Verificar la presencia de al menos una letra mayúscula y una letra minúscula
                if any(char.isupper() for char in self.password) and any(char.islower() for char in self.password):
                    # Verificar la presencia de al menos un dígito
                    if any(char.isdigit() for char in self.password):
                        pass_validator = True
        
        return pass_validator
    
    
    def decrypt(encrypted_data: list, key: str) -> list:
        data_decrypt = []
        key_bytes = key.encode('utf-8')
        
        for data in encrypted_data:
            # Divide el IV del mensaje cifrado
            iv_hex, encrypted_base64 = data.split(':')

            # Convierte los valores hexadecimales a bytes
            iv = bytes.fromhex(iv_hex)
            encrypted = base64.b64decode(encrypted_base64)

            # Asegúrate de que la clave tenga la longitud correcta (16 bytes para AES-128)
            cipher = AES.new(key_bytes, AES.MODE_CBC, iv)

            # Desencripta y elimina el padding
            decrypted = unpad(cipher.decrypt(encrypted), AES.block_size)
            data_decrypt.append(decrypted.decode('utf-8'))
            
        return data_decrypt
