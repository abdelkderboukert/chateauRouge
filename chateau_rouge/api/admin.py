from django.contrib import admin
from api.models import *


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name' ,'verified']

admin.site.register( Profile,ProfileAdmin)
admin.site.register(balite)
admin.site.register(Client)
admin.site.register(Camany)
admin.site.register(Buying)