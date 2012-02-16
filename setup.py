#! coding=utf8
from distutils.core import setup

setup(
    name='django-admin-multi-flexselect',
    version='0.4.0',
    author=u'Nishad Musthafa',
    author_email='nishadmusthafa@gmail.com',
    packages=['flexselect_multiple'],
    url='https://github.com/plivo/django-admin-multi-flexselect',
    license='Public Domain',
    description='Dynamic Multiple select fields for the Django Admin that just works combined with chosen.js.',
    long_description=open('README').read(),
    package_data={'flexselect_multiple': ['static/flexselect_multiple/js/']},
)
