import os
import django
from django.db import connection

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'centro_psicologico.settings')
django.setup()

def create_table():
    with connection.cursor() as cursor:
        cursor.execute("""
            CREATE TABLE core_reservahora (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                telefono INTEGER NOT NULL,
                tipo_consulta INTEGER NOT NULL,
                tipo_modalidad INTEGER NOT NULL,
                fecha DATE NOT NULL,
                hora VARCHAR(5) NOT NULL
            );
        """)

if __name__ == '__main__':
    create_table()
    print("Tabla core_reservahora creada exitosamente.")
