import bcrypt
import hashlib 
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64

class Usuario:

    def __init__(self, gmail,password):
        self.gmail = gmail
        self.password = password
        
    def gmail_validator(self):
        gmail_validator = False

        if '@' in self.gmail and self.gmail.count('@') == 1:
            local_part, domain_part = self.gmail.split('@')
            if domain_part.endswith('.com') and len(domain_part) > 4:
                if all(char.isalnum() or char in ['.', '-', '_'] for char in local_part):
                    gmail_validator = True
                    
        return gmail_validator
        
    def password_validador(self):
        pass_validator = False

        """ key = 'confidential'
        cipher = AES.new(key, AES.MODE_CBC)
        decrypted_data = unpad(cipher.decrypt(base64.b64decode(self.password)), AES.block_size)

        # Convertir los datos decodificados a una cadena de texto
        self.password = decrypted_data.decode('utf-8')
    
        print('prueba pass::',self.password)"""
        
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